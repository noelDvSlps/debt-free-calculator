import React from "react";

class DebtPaymentCount extends React.Component {
    
    render(){
        const { numberOfPayments } = this.props;
        return(
            // <ul>
            //    {items.map((item)=>(
            //     <li  key={item.id}>{item.text}</li>
            //    ))}
            // </ul>
            <div>{numberOfPayments}</div>
        )
    }
}

export default DebtPaymentCount;