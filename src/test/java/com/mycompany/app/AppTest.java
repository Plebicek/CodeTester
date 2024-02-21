package com.mycompany.app;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;

/**
 * Unit test for simple App.
 */
@ExtendWith(TestResultWatcher.class)
public class AppTest{
    /**
     * Rigorous Test :-)
     */
    @Test
    public void shouldAnswerWithTrue()
    {
        assertTrue( true );
    }

     @Test
    public void testSum() {
        // Arrange
        int num1 = 5;
        int num2 = 7;

        // Act
        int result = App.sum(num1, num2);

        // Assert
        assertEquals(12, 12, result);
    }
}

