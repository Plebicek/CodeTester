package org.example;

public class PrimeNumbersPrinter {
    public static String printPrimeNumbersTo(int to) {
        String result = "";
        for(int i = 2;i <= to;i += 1){
            boolean jePrvocislo = true;
            for(int j = 2; j < i; j +=1){
                if (i % j == 0){
                    jePrvocislo = false;
                    break;
                }
            }
            if(jePrvocislo == true){
                result += (i + ", ");


            }


        }
        return result.substring(0, result.length() - 2);
    }
}