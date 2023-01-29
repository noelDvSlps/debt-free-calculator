import React from "react";

class DebtNormalPayments extends React.Component {
  render() {
    const { normalPayments } = this.props;
    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Payment Number</th>
              <th>Interest</th>
              <th>Required Principal</th>
              <th>Minimum Payment</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {normalPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.number}</td>
                <td>{(Math.round(payment.interest * 100) / 100).toFixed(2)}</td>
                <td>
                  {(Math.round(payment.requiredPrincipal * 100) / 100).toFixed(
                    2
                  )}
                </td>
                <td>
                  {(Math.round(payment.minimumPayment * 100) / 100).toFixed(2)}
                </td>
                <td>{(Math.round(payment.balance * 100) / 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DebtNormalPayments;
