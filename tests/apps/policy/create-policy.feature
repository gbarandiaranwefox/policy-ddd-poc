Feature: Create a new policy
    As a user
    I want to create a new policy

    Scenario: A valid unexisting policy
        Given I send a POST request to "/policies" with body:
        """
        {
            "PolicyNumber": "abcde",
            "RelatedPolicies": [
                {
                    "Id": "abc",
                    "Type": "Substituted"
                },
                {
                    "Id": "def",
                    "Type": "Collective"
                }
            ]
        }
        """
        Then the response status code should be 201
        And the response should be empty
