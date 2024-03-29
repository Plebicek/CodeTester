package com.mycompany.app;

import java.util.ArrayList;
import java.util.List;

public class TestResultContainer {
    private List<String> successfulTests = new ArrayList<>();
    private List<TestFailure> failures = new ArrayList<>();

    public void addSuccess(String testName) {
        successfulTests.add(testName);
    }

    public void addFailure(String testName, Throwable cause) {
        failures.add(new TestFailure(testName, cause));
    }

    public List<String> getSuccessfulTests() {
        return successfulTests;
    }

    public List<TestFailure> getFailures() {
        return failures;
    }
}