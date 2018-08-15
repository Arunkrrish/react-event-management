import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import './App.css';
import Header from '.';

class Formaction extends Component {
  constructor(props) {
    super(props);
    this.state = { eventname: "", description: "", date: "", eventimage: "" };
    this.previewFile = this.previewFile.bind(this);
  }

  eventSubmit() {
    if (this.state.eventname === '' || this.state.description === '' || this.state.date === '') {
      alert("please fill up the details");
    }

    else {
      var url = 'http://localhost:3008/db';
      var { eventname, description, date, eventimage } = this.state;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventname, description, date, eventimage })
      }
      ).then(function (data) {
        return data.json();
      }).then(function (data) {
        this.props.history.push("/draw");
      }.bind(this))
        .catch(function (error) {
        });
    }
  }

  onChange(e, type) {
    if (type === "eventname") {
      this.setState({ eventname: e.target.value })
    } else if (type === "description") {
      this.setState({ description: e.target.value })
    } else if (type === "date") {
      this.setState({ date: e.target.value })
    }
  }
  showlistdraw(e) {
    e.preventDefault();
    this.props.history.push("/draw");
  }
  previewFile(e) {
    e.preventDefault();
    var files = e.target.files;
    var fileslen = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileslen);
    reader.onload = function () {
      var dataimage = reader.result;
      console.log(dataimage);
      this.setState({ eventimage: dataimage });
    }.bind(this);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container Loginportion">
          <div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4 formaction">
              <div align="center">
                <form>
                  <h1>Event Form </h1>
                  <TextField label="Eventname" type="text" value={this.state.eventname} onChange={(e) => { this.onChange(e, "eventname") }} /><br /><br />
                  <TextField label="Description" type="text" value={this.state.description} onChange={(e) => { this.onChange(e, "description") }} /><br /><br />
                  <TextField label="EventDate" id="date" type="date" value={this.state.date} onChange={(e) => { this.onChange(e, "date") }} InputLabelProps={{ shrink: true, }} /><br /><br />
                  EventImage:<input type="file" id="file" onChange={(e) => { this.previewFile(e) }} /><br /><br />
                  <Button className="square" variant="outlined" color="primary" onClick={() => this.eventSubmit()}>Add</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button className="square" variant="outlined" color="secondary" onClick={(e) => this.showlistdraw(e)}>Show Event List</Button>
                </form>
              </div>
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Formaction;
