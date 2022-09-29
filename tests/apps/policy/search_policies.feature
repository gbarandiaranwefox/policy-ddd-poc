Feature: Search all policies
    As a user
    I want to retrieve all the policies

    Scenario: There is no policies
        Given I send a GET request to "/policies"
        Then the response status code should be 200
        And the response body should be: 
        """
        []
        """
    Scenario: There are two policies
        Given I have these two policies:
        """
        [
            {
                "policyNumber": "TESTONE",
                "relatedPolicies": [
                    {
                        "id": "abc",
                        "type": "Substituted"
                    },
                    {
                        "id": "def",
                        "type": "Collective"
                    }
                ]
            },
            {
                "policyNumber": "TESTTWO",
                "relatedPolicies": [
                    {
                        "id": "abc",
                        "type": "Substituted"
                    },
                    {
                        "id": "def",
                        "type": "Collective"
                    }
                ]
            }
        ]
        """
        And I send a GET request to "/policies"
        Then the response status code should be 200
        And the response body should have 2 items
