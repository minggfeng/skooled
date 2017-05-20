import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import TextField from 'material-ui/TextField';

class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: ''
    };
    this.updateAmount = this.updateAmount.bind(this);
    this.onToken = this.onToken.bind(this);
  }

  updateAmount(event) {
    console.log(event.target.value);
    this.setState({
      amt: event.target.value
    });
  }

  onToken(token) {
    axios.post('/donate', {
      token,
      amount: this.state.amt.replace(/[$,.]+/g, '')
    })
      .then((response) => {
        console.log('success: ', response);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h3>Donations for school supplies!</h3>
        <NumberFormat
          hintText="Enter amount"
          customInput={TextField}
          value={this.state.amt}
          thousandSeparator={true}
          decimalPrecision={true}
          allowNegative={false}
          prefix={'$'}
          onChange={this.updateAmount}
        /><br/>
        <StripeCheckout
          name="Skooled"
          ComponentClass="div"
          panelLabel="Donate"
          amount={parseFloat(this.state.amt.replace(/[$,.]+/g, ''))}
          currency="USD"
          stripeKey="pk_test_mnfVBcs2Gp6FIH43bjkUMo8S"
          billingAddress={true}
          zipCode={false}
          token={this.onToken}
          reconfigureOnUpdate={false}
          allowRememberMe={false}
          >

        </StripeCheckout>

      </div>
    );
  }
}

export default Donate;
