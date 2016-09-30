var appState = {
  activeWindow: 0,
  user: {}
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
      activeContent = <Dashboard user={this.state.user} update={this.updateState}/>
    } else if (this.state.activeWindow === 1) {
      activeContent = <Kerabat user={this.state.user} update={this.updateState}/>
    } else if (this.state.activeWindow === 2) {
      activeContent = <FormPinjam user={this.state.user} update={this.updateState}/>
    } else if (this.state.activeWindow === 3) {
      activeContent = <RequestList user={this.state.user} update={this.updateState}/>
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
    for (i = 0; i < 4; i ++){
      classes[i] = 'list-group-item';
      if (this.state.active === i){
        classes[i] = classes[i] + 'list-group-item-active';
      }
    }
    this.props.update();
    return(
      <div id="sidebar" class="col-xs-12 col-sm-3 sidebar">
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
              <div className="panel-heading">Piutang</div>
              <div className="panel-body credit-display">
                <span className="big-money">{this.props.user.credit}</span>
              </div>
              <Debtors list={this.props.user.debtors}/>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 money-panel">
            <div className="panel panel-warning">
              <div className="panel-heading">Hutang</div>
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
        <div className="col-xs-12">
          <div className="row">
            <div className="media">
              <div className="media-left">
                <img className="media-object" src={debtor.picture} />
                <div className="media-body">
                  <h4 className="media-heading">{debtor.name}</h4>
                  {debtor.debt}
                </div>
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
        <div className="col-xs-12">
          <div className="row">
            <div className="media">
              <div className="media-left">
                <img className="media-object" src={creditor.picture} />
                <div className="media-body">
                  <h4 className="media-heading">{creditor.name}</h4>
                  {creditor.credit}
                </div>
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

// // Kerabat
// var Kerabat = React.createClass({
  
// })

// Render 
ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);