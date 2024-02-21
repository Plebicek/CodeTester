package com.mycompany.app;

public class TestFailure {
    private String testName;
    private Throwable cause;

    public TestFailure(String testName, Throwable cause) {
        this.testName = testName;
        this.cause = cause;
    }

    public String getTestName() {
        return testName;
    }

    public Throwable getCause() {
        return cause;
    }
}