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
        System.out.println(result.getSuccessfulTests());
    }

    public TestResultContainer getTestResultContainer() {
        return testResultContainer;
    }

    public void printTestResults() {
        System.out.println(testResultContainer);
    }
}