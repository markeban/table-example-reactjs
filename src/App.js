import React, { Component } from 'react';
import './App.css';
var axios = require('axios');



class ClientRequest extends Component {
  render() {
    const request = this.props.request;
    function createCell(reply) {
      return (
        <td key={reply.id}>{reply.text}</td>
      )
    }
    const replies = request.replies.map(createCell);
    return (
      <tr>
        <td key={0}>{request.client}</td>
        {replies}
      </tr>
    )
  }
}

class ClientRequests extends Component {
  render() {
    const requests = this.props.requests;
    function createRow(request) {
      return (
        <ClientRequest key={request.id} request={request}/>
      )
    }
    const rows = requests.map(createRow);
    return (
      <tbody>{rows}</tbody>
    );
  }
}

class CompanyHeading extends Component {
  render() {
    const company = this.props.company;
    function createCell(question) {
      return (
        <th key={question.id}>{question.text}</th>
      )
    }
    const questions = company.questions.map(createCell);
    return (
      <thead>
        <tr>
          <th key={0}>{company.name}</th>
          {questions}
        </tr>
      </thead>
    )
  }
}

class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {company: {requests: [], questions: []}}
  }

  componentDidMount() {
    this.CompanyList();
  }

  CompanyList() {
    return axios.get('http://localhost:3000/api/v1/companies/1.json').then((response) => {
      this.setState({
        company: response.data});
    });
  }

  render() {
    const company = this.state.company; 
    return (
      <table>        
          <CompanyHeading company={this.state.company} />
          <ClientRequests requests={company.requests} />
      </table>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RequestTable />
      </div>
    );
  }
}

export default App;
