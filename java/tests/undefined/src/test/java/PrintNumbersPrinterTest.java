import org.example.PrimeNumbersPrinter;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


import org.junit.jupiter.api.extension.ExtendWith;

/**
 * Unit test for simple App.
 */
@ExtendWith(TestResultWatcher.class)
class PrimeNumbersPrinterTest {

    @Test
    void testPrintPrimeNumbersTo() {
        assertEquals("2", PrimeNumbersPrinter.printPrimeNumbersTo(2));
        assertEquals("2, 3, 5, 7, 11, 13, 17, 19, 23, 29", PrimeNumbersPrinter.printPrimeNumbersTo(30));
        assertEquals("2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97", PrimeNumbersPrinter.printPrimeNumbersTo(100));
    }

}