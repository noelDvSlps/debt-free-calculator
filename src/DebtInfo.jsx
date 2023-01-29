import React from "react";
import DebtPaymentHistory from "./DebtPaymentHistory";
import DebtPaymentCount from "./DebtPaymentCount";
import DebtNormalPayments from "./DebtNormalPayments";

class DebtInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      debt: 0,
      interest: 0,
      paymentAmount: '',
      payments: [],
      numberOfPayments: 0,
      normalPayments: [],
      balance: 0,
      minimumPayment: '',
      maximumPayment: '',
    };
  }

  refreshState = () => {
   
    this.setState(() => ({
        numberOfPayments: 0,
        balance: 0,
        minimumPayment: '',
        maximumPayment: '',
        normalPayments:[],
        payments: [],
        paymentAmount: ''
      }));
  }

  debtChange = ({ target: { value } }) => {
    this.setState({ debt: Number(value) });
    this.refreshState();
    
  }
    
  interestChange = ({ target: { value } }) => {
    this.setState({ interest: Number(value) });
    this.refreshState();
  };
  paymentAmountChange = ({ target: { value } }) => {
    if(value===''){
        this.setState({ paymentAmount: value });

    } else {
        this.setState({ paymentAmount: Number(value) });
    }

    
  };

  numberOfPayments = (debt, interest) => {
    let myDebt = debt;
    let counter = 0;
    this.state.normalPayments.splice(0, this.state.normalPayments.length);
    if (myDebt > 100) {
      for (let i = 1; myDebt > 100; i++) {
        let newInterest = (interest / 100 / 12) * myDebt;
        let requiredPrincipal = myDebt * 0.01;
        let minimumPayment = newInterest + requiredPrincipal;
        myDebt -= requiredPrincipal;
        let newItem = {id: i,number: i, interest: newInterest, requiredPrincipal: requiredPrincipal, balance: myDebt, minimumPayment: minimumPayment };
        this.state.normalPayments.push(newItem);
        counter = i;
      }
    }
    if (myDebt > 0) {
        let newInterest = (1 / 100 / 12) * myDebt;
        let requiredPrincipal = myDebt;
        let minimumPayment = newInterest + requiredPrincipal;
        myDebt -= requiredPrincipal;
      counter += 1;
      let newItem = { id:counter, number: counter, interest: newInterest, requiredPrincipal: requiredPrincipal, balance: myDebt, minimumPayment: minimumPayment };
      this.state.normalPayments.push(newItem);
    }

    return counter;
  };



  formatTwoDecimals= (amount) => {
    return Number((Math.round(amount*100)/100).toFixed(2));
  }

  calculateSubmit = (e) => {
    e.preventDefault();
    if (Number(this.state.debt) === 0 || Number(this.state.interest)===0) {
        alert('Invalid amount for debt or interest')
    } else {
        const newItem = {
            debt: this.state.debt,
            interest: this.state.interest,
          };
      
          this.setState(() => ({
            debt: newItem.debt,
            interest: newItem.interest,
            numberOfPayments: this.numberOfPayments(newItem.debt, newItem.interest),
            balance: newItem.debt,
            minimumPayment: this.calculateMinimum(newItem.debt, newItem.interest),
            //maximumPayment: this.calculateMaximum(newItem.debt, newItem.interest),
            maximumPayment: newItem.debt + this.calculateInterest(newItem.debt,newItem.interest),
            
          }));
    }

    
  };

  calculateInterest=(principal, interest) => {
    let interestAmount = 0
    if (principal > 100) {
       interestAmount = (interest / 100 / 12) * principal;
    } else {
       interestAmount = (principal * 0.01);
    }

    return this.formatTwoDecimals(interestAmount);

  }

  calculateBalance=(principal, interest) => {
    let balance = 0
    balance = this.state.balance-(this.state.paymentAmount-this.calculateInterest(principal, interest))
    return this.formatTwoDecimals(balance);

  }

  
  
  paymentSubmit = (e) => {
    e.preventDefault();
   
    
    let paymentAmount = this.formatTwoDecimals(this.state.paymentAmount);
    if ( paymentAmount >= this.state.minimumPayment 
        && paymentAmount <= this.state.maximumPayment 
        &&  paymentAmount > 0 
        && this.state.debt > 0 ){
        const newItem = {
            id: Date.now(),
            paymentAmount:this.formatTwoDecimals(this.state.paymentAmount),
            interestAmount:this.calculateInterest(this.state.balance, this.state.interest), 
            balance: this.calculateBalance(this.state.balance, this.state.interest),
          };
      
          this.setState((state) => ({
            payments: [ newItem,...state.payments],
            balance: Number(newItem.balance),
            minimumPayment: this.calculateMinimum(newItem.balance, this.state.interest),
            paymentAmount: '',
            maximumPayment: newItem.balance + this.calculateInterest(newItem.balance,this.state.interest),
            
          }));
          if(newItem.balance === 0 ) {
            alert('You are paid off')
          }

    } else {
        if(this.state.debt === 0 || this.state.interest === 0){
            alert('Please enter debt or interest')

        } else if(this.state.balance === 0){
            alert(
                `You have no balance`
            )
        

        } else if(paymentAmount === 0){
            alert(
                `Zero amount not allowed`
            )

        } else {
            alert(
                `minimum payment: ${this.state.minimumPayment}
maximum payment: ${this.state.maximumPayment}
            `)

        }
        
    }

    
  
};

  calculateMinimum = (principal, interest) => {
    let minimumPayment = principal;
    if (principal > 100) {
      minimumPayment = principal * 0.01 + (interest / 100 / 12) * principal;
    } else {
      minimumPayment = principal + (principal * 0.01);
    }

    return this.formatTwoDecimals(minimumPayment);
  };

  calculateMaximumPayment = (principal, interest) => {
       return this.formatTwoDecimals(principal + this.calculateInterest(principal,interest));
  };

  render() {
    return (
      <div>
        <section className="container-fluid">
          <div className="container">
            <h2>DEBT FREE CALCULATOR</h2>
            <div className="main-wrapper">
            <div className="wrapper-1">
              <div className="left">
                <form onSubmit={this.calculateSubmit}>
                  <div className="debt-info-user">
                    <div className="debt-info">
                      <h3> Total Debt</h3>
                      <input
                        id="debt"
                        onChange={this.debtChange}
                        type="number"
                        autoComplete="off"
                        step="0.01"
                      />
                     
                      
                    </div>
                    <div className="debt-info">
                    <h3> Interest</h3>
                      
                      <input
                        id="interest"
                        onChange={this.interestChange}
                        type="number"
                        autoComplete="off"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary">Calculate</button>
                </form>
              </div>
              <div className="right">
                <h3> Number of Normal Payments</h3>
                <DebtPaymentCount
                  numberOfPayments={this.state.numberOfPayments}
                />
                <DebtNormalPayments
                  normalPayments={this.state.normalPayments}
                />
              </div>
            </div>
            <div className="wrapper-2">
              <div className="bottom">
                <form onSubmit={this.paymentSubmit}>
                  <h3>Make A Payment</h3>
                  <div>
                    Minimum Payment:
                    {this.calculateMinimum(
                      this.state.balance,
                      this.state.interest
                    )}
                  </div>  
                  <div>
                    Maximum Payment:
                    {this.calculateMaximumPayment(
                      this.state.balance,
                      this.state.interest
                    )}
                    
                  </div>
                  <br />
                  <label>Enter Amount &nbsp; $ &nbsp;</label>
                  <input
                    onChange={this.paymentAmountChange}
                    type="number"
                    autoComplete="off"
                    step="0.01"
                    value={this.state.paymentAmount}
                  />
                 <br />
                  <button className="btn btn-primary">Submit Payment</button>
                  <br />
                  <br />
                </form>
                <DebtPaymentHistory payments={this.state.payments} />
              </div>
            </div>

            </div>
            
          </div>
        </section>
      </div>
    );
  }
}

export default DebtInfo;
