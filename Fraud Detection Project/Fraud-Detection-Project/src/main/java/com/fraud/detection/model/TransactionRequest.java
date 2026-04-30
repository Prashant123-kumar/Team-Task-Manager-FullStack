package com.fraud.detection.model;

public class TransactionRequest {

    private double TransactionAmt;
    private int card1;
    private int card2;
    private int card3;
    private long TransactionDT;

    public double getTransactionAmt() { return TransactionAmt; }
    public void setTransactionAmt(double transactionAmt) { TransactionAmt = transactionAmt; }

    public int getCard1() { return card1; }
    public void setCard1(int card1) { this.card1 = card1; }

    public int getCard2() { return card2; }
    public void setCard2(int card2) { this.card2 = card2; }

    public int getCard3() { return card3; }
    public void setCard3(int card3) { this.card3 = card3; }

    public long getTransactionDT() { return TransactionDT; }
    public void setTransactionDT(long transactionDT) { TransactionDT = transactionDT; }
}