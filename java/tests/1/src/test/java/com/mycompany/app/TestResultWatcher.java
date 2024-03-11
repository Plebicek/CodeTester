package com.mycompany.app;

import org.junit.jupiter.api.extension.AfterAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;

import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;

import org.json.*;

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
        JSONObject jo = new JSONObject();
        jo.put("passed", passedTests);
        jo.put("failed", failedTests);
        jo.put("total", runnedTestsNumber);

        System.out.println(jo.toString());
       /*  System.out.println("{}");
        System.out.println("failed tests " + failedTests);
        System.out.println("passed tests " + passedTests);
        System.out.println("Total tests: " + runnedTestsNumber);
        System.out.println("The success percentage is : " + runnedSuccesfullPercentage);

        try {
            URL url = new URL("http://localhost:3000/test");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setDoOutput(true);             
            con.setDoInput(true);  
    
            JSONObject jo = new JSONObject();
            jo.put("passed", passedTests);
            jo.put("failed", failedTests);
            jo.put("total", runnedTestsNumber);

            // Convert the JSON object to a string.
            String jsonString = jo.toString();

            // Write the JSON data to the connection output stream.
            OutputStream os = con.getOutputStream();
            byte[] input = jsonString.getBytes("utf-8");
            os.write(input, 0, input.length);
            System.out.println(con.getResponseCode());

         } catch (Exception err) {
            /* Send to connection failure endpoint 
            System.out.println(err);
        } */
      
    }

    public TestResultContainer getTestResultContainer() {
        return testResultContainer;
    }

    public void printTestResults() {
        System.out.println(testResultContainer);
    }
}