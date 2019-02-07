import React from "react";

class ReadOwner extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.ExioExChange
    // console.log(this.props.drizzleState)

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["owner"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { ExioExChange } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const owner = ExioExChange.owner[this.state.dataKey];

    // if it exists, then we display its value
    return <p>Contract owner: {owner && owner.value}</p>;
  }
}

export default ReadOwner;
