package com.mycompany.app;

import org.junit.jupiter.api.extension.AfterAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;

public class TestResultWatcher implements TestWatcher, AfterAllCallback {
    private TestResultContainer testResultContainer = new TestResultContainer();

    @Override
    public void testSuccessful(ExtensionContext context) {
        String testName = context.getDisplayName();
        testResultContainer.addSuccess(testName);
    }

    @Override
    public void testFailed(ExtensionContext context, Throwable cause) {
        String testName = context.getDisplayName();
        testResultContainer.addFailure(testName, cause);
    }

    @Override
    public void afterAll(ExtensionContext context) throws Exception {
        TestResultContainer result  = getTestResultContainer();
        int failedTests = result.getFailures().size();
        int passedTests  = result.getSuccessfulTests().size();
        int runnedTestsNumber  = result.getFailures().size() + result.getSuccessfulTests().size();
        float runnedSuccesfullPercentage = 0f;
        if (runnedTestsNumber > 0 || passedTests > 0) {
            runnedSuccesfullPercentage = (passedTests / runnedTestsNumber) * 100;
        }
        System.out.println("failed tests " + failedTests);
        System.out.println("passed tests " + passedTests);
        System.out.println("Total tests: " + runnedTestsNumber);
        System.out.println("The success percentage is : " + runnedSuccesfullPercentage);
    }

    public TestResultContainer getTestResultContainer() {
        return testResultContainer;
    }

    public void printTestResults() {
        System.out.println(testResultContainer);
    }
}