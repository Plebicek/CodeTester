package com.mycompany.app;


import org.junit.platform.launcher.TestExecutionListener;
import org.junit.platform.launcher.TestPlan;
import org.junit.platform.launcher.TestIdentifier;
import org.junit.platform.engine.TestExecutionResult;


public class CustomTestExecutionListener implements TestExecutionListener {

    @Override
    public void testPlanExecutionStarted(TestPlan testPlan) {
        // This method is called before any tests are executed
        System.out.println("Test plan execution started.");
    }

    @Override
    public void testPlanExecutionFinished(TestPlan testPlan) {
        // This method is called after all tests have been executed
        System.out.println("Test plan execution finished.");
    }

    @Override
    public void executionFinished(TestIdentifier testIdentifier, TestExecutionResult testExecutionResult) {
        // This method is called after each test is executed
        System.out.println("Test " + testIdentifier.getDisplayName() +
                " finished with result: " + testExecutionResult.getStatus());
    }
}