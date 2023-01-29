import React from "react";

class DebtPaymentHistory extends React.Component {
  render() {
    const { payments } = this.props;
    return (
      <div className="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>Payment Id</th>
            <th>Interest</th>
            <th>Payment</th>
            <th>Balance</th>
          </tr>

          </thead>
          <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.interestAmount}</td>
              <td>{payment.paymentAmount}</td>
              <td>{payment.balance}</td>
            </tr>
          ))}

          </tbody>
          
          
        </table>
      </div>
    );
  }
}

export default DebtPaymentHistory;
