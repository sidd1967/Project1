import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
export default class HistoryModalWindow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Access History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-bordered table-striped mb-0">
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Accessing Time</th>
                <th scope="col">Action Performed</th>
              </tr>
              {this.props.dynamicdata.map((history, key) => (
                <tr key={key}>
                  <td>{history.fullName}</td>
                  <td>{history.timestamp}</td>
                  <td>{history.action}</td>
                </tr>
              ))}
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
