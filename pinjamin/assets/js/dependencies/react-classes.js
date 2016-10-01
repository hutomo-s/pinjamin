var appState = {
  activeWindow: 0,
  user: {
    name: 'Gunawan',
    user_id: 10,
    credit: '10000',
    debt: '100',
    debtors: [
      {
        key: 1,
        picture: '/assets/img/a.jpg',
        name: 'a',
        debt: '5000'
      },
      {
        key: 2,
        picture: '/assets/img/b.jpg',
        name: 'b',
        debt: '5000'
      }
    ],
    creditors: [
      {
        key: 1,
        picture: '/assets/img/c.jpg',
        name: 'c',
        credit: '500'
      }
    ],
    kerabat: [
      {
        key: 0,
        picture: '/assets/img/a.jpg',
        name: 'a',
        email: 'a@aaa.com'
      },
      {
        key: 1,
        picture: '/assets/img/b.jpg',
        name: 'b',
        email: 'b@bbb.net'
      },
      {
        key: 2,
        picture: '/assets/img/c.jpg',
        name: 'c',
        email: 'c@ccc.org'
      }
    ],
    requests: [
      {
        key: 0,
        picture: '/assets/img/d.jpg',
        name: 'd',
        date: '1 Februari 2016'
      },
      {
        key: 1,
        picture: '/assets/img/e.jpg',
        name: 'e',
        date: '7 Juli 2016'
      }
    ],
  }
}

// App
var App = React.createClass({
  getInitialState: function(){
    return(appState);
  },
  updateState: function(){
    console.log(this.state);
    this.setState(appState);
    this.forceUpdate();
  },
  render: function(){
    if (this.state.activeWindow === 0) {
      $('.dashboard').show();
      $('.kerabat').hide();
      $('.form-pinjam').hide();
      $('.requests').hide();
    } else if (this.state.activeWindow === 1) {
      $('.kerabat').show();
      $('.dashboard').hide();
      $('.form-pinjam').hide();
      $('.requests').hide();
    } else if (this.state.activeWindow === 2) {
      $('.form-pinjam').show();
      $('.dashboard').hide();
      $('.kerabat').hide();
      $('.requests').hide();
    } else if (this.state.activeWindow === 3) {
      $('.form-pinjam').hide();
      $('.dashboard').hide();
      $('.kerabat').hide();
      $('.requests').show();
    }

    return(
      <div>
        <Sidebar update={this.updateState} />
        <Dashboard user={this.state.user} update={() => this.updateState}/>
        <Kerabat user={this.state.user} update={() => this.updateState}/>
        <FormPinjam user={this.state.user} update={() => this.updateState}/>
        <RequestList user={this.state.user} update={() => this.updateState}/>
      </div>
    )
  }
});

// Sidebar
var Sidebar = React.createClass({
  getInitialState: function(){
    return({active: appState.activeWindow});
  },
  handleChange: function(event){
    this.setState({active: event});
    appState.activeWindow = event;
    this.props.update();
  },
  render: function(){
    var classes = [];
    for (var i = 0; i < 4; i ++){
      classes[i] = 'list-group-item';
      if (this.state.active === i){
        classes[i] = classes[i] + ' list-group-item-active';
      }
    }
    return(
      <div id="sidebar" className="col-xs-12 col-sm-3 sidebar">
        <div className="list-group row" onClick={() => this.handleChange(0)}>
          <a className={classes[0]} href="#">Dashboard</a>
        </div>
        <div className="list-group row" onClick={() => this.handleChange(1)}>
          <a className={classes[1]} href="#">Kerabat</a>
        </div>
        <div className="list-group row" onClick={() => this.handleChange(2)}>
          <a className={classes[2]} href="#">Pinjam</a>
        </div>
        <div className="list-group row" onClick={() => this.handleChange(3)}>
          <a className={classes[3]} href="#">Daftar Request</a>
        </div>
      </div>
    )
  }
});

// Dashboard
var Dashboard = React.createClass({
  render: function(){
    return(
      <div className="col-xs-12 col-sm-9 dashboard">
        <div className="row">
          <div className="col-xs-12 col-sm-6 money-panel">
            <div className="panel panel-success">
              <div className="panel-heading credit-display">Piutang</div>
              <div className="panel-body credit-display">
                <span className="big-money">{this.props.user.credit}</span>
              </div>
              <Debtors list={this.props.user.debtors}/>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 money-panel">
            <div className="panel panel-warning">
              <div className="panel-heading debt-display">Hutang</div>
              <div className="panel-body debt-display">
                <span className="big-money">{this.props.user.debt}</span>
              </div>
              <Creditors list={this.props.user.creditors} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

// Dashboard -> Debtors
var Debtors = React.createClass({
  render: function() {
    var debtors = this.props.list.map(function(debtor) {
      return(
        <div className="col-xs-12" key={debtor.key}>
          <div className="row">
            <div className="media">
              <div className="media-left">
                <img className="media-object" src={debtor.picture} />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{debtor.name}</h4>
                {debtor.debt}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return(
      <div className="debtors-list">
        {debtors}
      </div>
    );
  } 
});

// Creditors
var Creditors = React.createClass({
  render: function() {
    var creditors = this.props.list.map(function(creditor) {
      return(
        <div className="col-xs-12" key={creditor.key}>
          <div className="row">
            <div className="media">
              <div className="media-left">
                <img className="media-object" src={creditor.picture} />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{creditor.name}</h4>
                {creditor.credit}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return(
      <div className="creditors-list">
        {creditors}
      </div>
    );
  } 
});

// Kerabat
var Kerabat = React.createClass({
  // componentWillMount: function() {
  //   var updateKerabat = function(event){
  //     appState.user.kerabat = event[0];
  //     for (var i = 0; i < appState.user.kerabat.length; i ++) {
  //       appState.user.kerabat.key = i;
  //     }
  //     this.props.update(); 
  //   }
  //   $.ajax({
  //     url: 'list-kerabat',
  //     data:{
  //       user_id: this.props.user.user_id,
  //     }, 
  //     cache: false,
  //     type: 'POST',
  //     success: updateKerabat.bind(this),
  //   });
  // },
  // handleClick: function() {
  //   //TODO send ajax
  // },
  render: function() {
    console.log(this.props.user.kerabat);
    var kerabats = this.props.user.kerabat.map(function(kerabat){
      var details = '';
      if (kerabat.opened === true){
        // print details
      }
      console.log('hi');
      return(
        <div className="row kerabat" key={kerabat.key}>
          <div className="media">
            <div className="media-left">
              <img className="media-object" src={kerabat.picture} />
            </div>
            <div className="media-body">
              <h4 className="media-header">{kerabat.name}</h4>
              {kerabat.email}
            </div>
          </div>
        </div>
      );
    });
    return(
      <div className="col-xs-12 col-sm-9">
        {kerabats}
      </div>
    );
  }  
});

// FormPinjam
var FormPinjam = React.createClass({
  // handleSubmit: function(event){
  //   // TODO
  // },
  // componentWillMount: function(){
  //   var updateKerabat = function(event){
  //     appState.user.kerabat = event[0];
  //     this.props.update(); 
  //   }
  //   $.ajax({
  //     url: 'list-kerabat',
  //     data:{
  //       user_id: this.props.user.user_id,
  //     }, 
  //     cache: false,
  //     type: 'POST',
  //     success: updateKerabat,
  //   });
  // },
  render: function(){
    var kerabats = this.props.user.kerabat.map(function(kerabat){
      return(
        <option value={kerabat.user_id} key={kerabat.key}>{kerabat.name}</option>
      );
    });
    return(
      <div className="col-xs-12 col-sm-9 form-pinjam">
        <div className="row form-container">
          <form>
            <label htmlFor="jumlah-saldo">Jumlah Saldo</label>
            <div className="input-group">
              <input type="text" className="form-control" id="jumlah-saldo" placeholder="Jumlah Saldo" />
            </div>
            <label htmlFor="tenor">Tenor</label>
            <div className="input-group">
              <input type="number" className="form-control" id="tenor" />
              <span className="input-group-addon">bulan</span>
            </div>
            <label htmlFor="kerabat">Kerabat</label>
            <div className="input-group">
              <select className="form-control" id="kerabat">
                {kerabats}
              </select>
            </div>
            <label htmlFor="alasan">Alasan Meminjam</label>
            <div className="input-group">
              <textarea className="form-control" id="alasan" />
            </div>
            <button type="button" className="btn btn-default" id="cancel">Batal</button>
            <button type="submit" className="btn btn-default" id="submit">Pinjam</button>
          </form>
        </div>
      </div>
    );
  }
});

// Requests
var RequestList = React.createClass({
  // componentWillMount: function(){
  //   var updateRequests = function(event) {
  //     appState.user.requests = event[0];
  //     //this.props.update(); 
  //   }
  //   $.ajax({
  //     url: 'list-all-loan',
  //     data:{
  //       user_id: this.props.user.user_id,
  //     }, 
  //     cache: false,
  //     type: 'POST',
  //     success: updateRequests,
  //   });
  // },
  render: function(){
    var requests = this.props.user.requests.map(function(request){
      return(
        <div className="row requester" key={request.key}>
          <div className="media">
            <div className="media-left">
              <img className="media-object" src={request.picture} />
            </div>
            <div className="media-body">
              <h4 className="media-heading">{request.name}</h4>
              {request.date}
            </div>
          </div>
        </div>
      )
    });

    return(
      <div className="col-xs-12 col-sm-9 requests">
        {requests}
      </div>
    )
  }
});

// Render 
ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);