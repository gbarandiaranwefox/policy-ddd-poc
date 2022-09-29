import * as packageJSON from '../../../../package.json';

class Healthcheck {
  public static readonly SERVICE_UP = 'UP';
  public static readonly SERVICE_DOWN = 'DOWN';
  private static readonly DATABASE_SERVICE = 'Database';
  private static readonly CRITICAL_SERVICES = [
    Healthcheck.DATABASE_SERVICE,
  ];
  private static readonly DATABASE_CONNECTION_TIMEOUT = 3000;

  public async checkStatus() {
    const services = [
      await this.checkDatabaseService(),
    ];

    const criticalStatusUp: boolean = this.checkCriticalServicesStatusUp(services);

    return {
      services,
      status: criticalStatusUp ? Healthcheck.SERVICE_UP : Healthcheck.SERVICE_DOWN,
      version: packageJSON.version,
      startTime: this.getProcessStartTime(),
    };
  }

  private async checkDatabaseService() {
    const startTime = Date.now();
    let status = Healthcheck.SERVICE_DOWN;
    let responseTimeMs;

    const databaseCheck: Promise<void> = new Promise(async resolve => {
      try {
        // TODO:
        // 1. perform query to DB
        // 2. check results
        status = Healthcheck.SERVICE_UP;

        responseTimeMs = Date.now() - startTime;
        resolve();
      } catch (err) {
        status = Healthcheck.SERVICE_DOWN;
        responseTimeMs = Date.now() - startTime;
      }
    });

    const timeout: Promise<void> = new Promise(resolve => {
      responseTimeMs = null;
      // tslint:disable-next-line:ban
      setTimeout(resolve, Healthcheck.DATABASE_CONNECTION_TIMEOUT);
    });

    await Promise.race([databaseCheck, timeout]);

    return {
      responseTimeMs,
      status,
      name: Healthcheck.DATABASE_SERVICE,
    };
  }

  private checkCriticalServicesStatusUp(services: any[]): boolean {
    for (const service of services) {
      if (Healthcheck.IS_CRITICAL(service) && Healthcheck.IS_DOWN(service)) {
        return false;
      }
    }

    return true;
  }

  private static IS_CRITICAL(service: { name: string; }): boolean {
    return Healthcheck.CRITICAL_SERVICES.includes(service.name);
  }

  private static IS_DOWN(service: { status: string; }): boolean {
    return service.status === Healthcheck.SERVICE_DOWN;
  }

  private getProcessStartTime(): Date {
    const uptimeInMilliseconds = process.uptime() * 1000;
    const currentDateInMilliseconds = Date.now();

    return new Date(currentDateInMilliseconds - uptimeInMilliseconds);
  }
}

export { Healthcheck };
