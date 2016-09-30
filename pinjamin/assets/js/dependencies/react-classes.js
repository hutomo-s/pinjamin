var appState = {
  activeWindow: 0,
  user: {
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
    ]
  }
}

// App
var App = React.createClass({
  getInitialState: function(){
    return(appState);
  },
  updateState: function(){
    this.setState(appState);
  },
  render: function(){
    var activeContent = '';
    if (this.state.activeWindow === 0) {
      activeContent = <Dashboard user={this.state.user} update={this.updateState}/>;
    } else if (this.state.activeWindow === 1) {
      activeContent = <Kerabat user={this.state.user} update={this.updateState}/>;
    } else if (this.state.activeWindow === 2) {
      activeContent = <FormPinjam user={this.state.user} update={this.updateState}/>;
    } else if (this.state.activeWindow === 3) {
      activeContent = <RequestList user={this.state.user} update={this.updateState}/>;
    }

    return(
      <div>
        <Sidebar update={this.updateState} />
        {activeContent}
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
        classes[i] = classes[i] + 'list-group-item-active';
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
      <div className="col-xs-12 col-sm-9">
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
  componentWillMount: function() {
    $.ajax({
      url: 'list-kerabat',
      data:{
        user_id: this.props.user.user_id,
      }, 
      cache: false,
      type: 'POST',
      success: function(event){
        appState.user.kerabat = jQuery.parseJSON(event);
        this.props.update(); 
      }
    });
  },
  handleClick: function() {
    //TODO send ajax
  },
  render: function() {
    var kerabats = this.props.user.kerabat.map(function(kerabat){
      var details = '';
      if (kerabat.opened === true){
        // print details
      }
      return(
        <div className="col-xs-12">
          <div className="row kerabat">
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
        </div>
      );
    });

    return(
      {kerabats}
    );
  }  
});

// FormPinjam
var FormPinjam = React.createClass({
  handleSubmit: function(event){
    // TODO
  },
  componentWillMount: function(){
    $.ajax({
      url: 'list-kerabat',
      data:{
        user_id: this.props.user.user_id,
      }, 
      cache: false,
      type: 'POST',
      success: function(event){
        appState.user.kerabat = jQuery.parseJSON(event);
        this.props.update(); 
      }
    });
  },
  render: function(){
    var kerabats = this.props.user.kerabat.map(function(kerabat){
      return(
        <option value={kerabat.user_id}>{kerabat.name}</option>
      );
    });
    return(
      <div className="col-xs-12">
        <div className="row form-container">
          <form>
            <label for="jumlah-saldo">Jumlah Saldo</label>
            <div className="input-group">
              <input type="text" className="form-control" id="jumlah-saldo" placeholder="Jumlah Saldo" />
            </div>
            <label for="tenor">Tenor</label>
            <div className="input-group">
              <input type="number" className="form-control" id="tenor" />
              <span class="input-group-addon">bulan</span>
            </div>
            <label for="kerabat">Kerabat</label>
            <div className="input-group">
              <select className="form-control" id="kerabat">
                {kerabats}
              </select>
            </div>
            <label for="alasan">Alasan Meminjam</label>
            <div className="input-group">
              <textarea className="form-control" id="alasan" />
            </div>
            <button type="button" class="btn btn-default" id="cancel">Batal</button>
            <button type="submit" class="btn btn-default" id="submit">Pinjam</button>
          </form>
        </div>
      </div>
    );
  }
});

// Requests
var RequestList = React.createClass({
  componentWillMount: function(){
    $.ajax({
      url: 'list-all-loan',
      data:{
        user_id: this.props.user.user_id,
      }, 
      cache: false,
      type: 'POST',
      success: function(event){
        appState.user.requests = jQuery.parseJSON(event);
        this.props.update(); 
      }
    });
  },
  render: function(){
    var requests = this.props.user.requests.map(function(request){
      return(
        <div className="row requester">
          <div className="media">
            <div className="media-left">
              <img class="media-object" src={request.user.picture} />
            </div>
            <div class="media-body">
              <h4 classname="media-heading">{request.user.name}</h4>
              {request.date}
            </div>
          </div>
        </div>
      )
    });

    return(
      <div className="col-xs-12">
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