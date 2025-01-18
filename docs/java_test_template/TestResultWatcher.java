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
        JSONObject jo = new JSONObject();
        jo.put("pass", passedTests);
        jo.put("fail", failedTests);
        jo.put("total", runnedTestsNumber);

        System.out.println(jo.toString());
    }

    public TestResultContainer getTestResultContainer() {
        return testResultContainer;
    }

    public void printTestResults() {
        System.out.println(testResultContainer);
    }
}