/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var appState = {
	  activeWindow: 0,
	  user: {
	    name: 'Gunawan',
	    user_id: 10,
	    credit: '10000',
	    debt: '100',
	    debtors: [{
	      key: 1,
	      picture: '/assets/img/a.jpg',
	      name: 'a',
	      debt: '5000'
	    }, {
	      key: 2,
	      picture: '/assets/img/b.jpg',
	      name: 'b',
	      debt: '5000'
	    }],
	    creditors: [{
	      key: 1,
	      picture: '/assets/img/c.jpg',
	      name: 'c',
	      credit: '500'
	    }],
	    kerabat: [{
	      key: 0,
	      picture: '/assets/img/a.jpg',
	      name: 'a',
	      email: 'a@aaa.com'
	    }, {
	      key: 1,
	      picture: '/assets/img/b.jpg',
	      name: 'b',
	      email: 'b@bbb.net'
	    }, {
	      key: 2,
	      picture: '/assets/img/c.jpg',
	      name: 'c',
	      email: 'c@ccc.org'
	    }],
	    requests: [{
	      key: 0,
	      picture: '/assets/img/d.jpg',
	      name: 'd',
	      date: '1 Februari 2016'
	    }, {
	      key: 1,
	      picture: '/assets/img/e.jpg',
	      name: 'e',
	      date: '7 Juli 2016'
	    }]
	  }
	};

	// App
	var App = React.createClass({
	  displayName: 'App',

	  getInitialState: function getInitialState() {
	    return appState;
	  },
	  updateState: function updateState() {
	    console.log(this.state);
	    this.setState(appState);
	    this.forceUpdate();
	  },
	  render: function render() {
	    var _this = this;

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

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(Sidebar, { update: this.updateState }),
	      React.createElement(Dashboard, { user: this.state.user, update: function update() {
	          return _this.updateState;
	        } }),
	      React.createElement(Kerabat, { user: this.state.user, update: function update() {
	          return _this.updateState;
	        } }),
	      React.createElement(FormPinjam, { user: this.state.user, update: function update() {
	          return _this.updateState;
	        } }),
	      React.createElement(RequestList, { user: this.state.user, update: function update() {
	          return _this.updateState;
	        } })
	    );
	  }
	});

	// Sidebar
	var Sidebar = React.createClass({
	  displayName: 'Sidebar',

	  getInitialState: function getInitialState() {
	    return { active: appState.activeWindow };
	  },
	  handleChange: function handleChange(event) {
	    this.setState({ active: event });
	    appState.activeWindow = event;
	    this.props.update();
	  },
	  render: function render() {
	    var _this2 = this;

	    var classes = [];
	    for (var i = 0; i < 4; i++) {
	      classes[i] = 'list-group-item';
	      if (this.state.active === i) {
	        classes[i] = classes[i] + ' list-group-item-active';
	      }
	    }
	    return React.createElement(
	      'div',
	      { id: 'sidebar', className: 'col-xs-12 col-sm-3 sidebar' },
	      React.createElement(
	        'div',
	        { className: 'list-group row', onClick: function onClick() {
	            return _this2.handleChange(0);
	          } },
	        React.createElement(
	          'a',
	          { className: classes[0], href: '#' },
	          'Dashboard'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'list-group row', onClick: function onClick() {
	            return _this2.handleChange(1);
	          } },
	        React.createElement(
	          'a',
	          { className: classes[1], href: '#' },
	          'Kerabat'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'list-group row', onClick: function onClick() {
	            return _this2.handleChange(2);
	          } },
	        React.createElement(
	          'a',
	          { className: classes[2], href: '#' },
	          'Pinjam'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'list-group row', onClick: function onClick() {
	            return _this2.handleChange(3);
	          } },
	        React.createElement(
	          'a',
	          { className: classes[3], href: '#' },
	          'Daftar Request'
	        )
	      )
	    );
	  }
	});

	// Dashboard
	var Dashboard = React.createClass({
	  displayName: 'Dashboard',

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'col-xs-12 col-sm-9 dashboard' },
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'div',
	          { className: 'col-xs-12 col-sm-6 money-panel' },
	          React.createElement(
	            'div',
	            { className: 'panel panel-success' },
	            React.createElement(
	              'div',
	              { className: 'panel-heading credit-display' },
	              'Piutang'
	            ),
	            React.createElement(
	              'div',
	              { className: 'panel-body credit-display' },
	              React.createElement(
	                'span',
	                { className: 'big-money' },
	                this.props.user.credit
	              )
	            ),
	            React.createElement(Debtors, { list: this.props.user.debtors })
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'col-xs-12 col-sm-6 money-panel' },
	          React.createElement(
	            'div',
	            { className: 'panel panel-warning' },
	            React.createElement(
	              'div',
	              { className: 'panel-heading debt-display' },
	              'Hutang'
	            ),
	            React.createElement(
	              'div',
	              { className: 'panel-body debt-display' },
	              React.createElement(
	                'span',
	                { className: 'big-money' },
	                this.props.user.debt
	              )
	            ),
	            React.createElement(Creditors, { list: this.props.user.creditors })
	          )
	        )
	      )
	    );
	  }
	});

	// Dashboard -> Debtors
	var Debtors = React.createClass({
	  displayName: 'Debtors',

	  render: function render() {
	    var debtors = this.props.list.map(function (debtor) {
	      return React.createElement(
	        'div',
	        { className: 'col-xs-12', key: debtor.key },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'media' },
	            React.createElement(
	              'div',
	              { className: 'media-left' },
	              React.createElement('img', { className: 'media-object', src: debtor.picture })
	            ),
	            React.createElement(
	              'div',
	              { className: 'media-body' },
	              React.createElement(
	                'h4',
	                { className: 'media-heading' },
	                debtor.name
	              ),
	              debtor.debt
	            )
	          )
	        )
	      );
	    });
	    return React.createElement(
	      'div',
	      { className: 'debtors-list' },
	      debtors
	    );
	  }
	});

	// Creditors
	var Creditors = React.createClass({
	  displayName: 'Creditors',

	  render: function render() {
	    var creditors = this.props.list.map(function (creditor) {
	      return React.createElement(
	        'div',
	        { className: 'col-xs-12', key: creditor.key },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'media' },
	            React.createElement(
	              'div',
	              { className: 'media-left' },
	              React.createElement('img', { className: 'media-object', src: creditor.picture })
	            ),
	            React.createElement(
	              'div',
	              { className: 'media-body' },
	              React.createElement(
	                'h4',
	                { className: 'media-heading' },
	                creditor.name
	              ),
	              creditor.credit
	            )
	          )
	        )
	      );
	    });
	    return React.createElement(
	      'div',
	      { className: 'creditors-list' },
	      creditors
	    );
	  }
	});

	// Kerabat
	var Kerabat = React.createClass({
	  displayName: 'Kerabat',

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
	  render: function render() {
	    console.log(this.props.user.kerabat);
	    var kerabats = this.props.user.kerabat.map(function (kerabat) {
	      var details = '';
	      if (kerabat.opened === true) {
	        // print details
	      }
	      console.log('hi');
	      return React.createElement(
	        'div',
	        { className: 'row kerabat', key: kerabat.key },
	        React.createElement(
	          'div',
	          { className: 'media' },
	          React.createElement(
	            'div',
	            { className: 'media-left' },
	            React.createElement('img', { className: 'media-object', src: kerabat.picture })
	          ),
	          React.createElement(
	            'div',
	            { className: 'media-body' },
	            React.createElement(
	              'h4',
	              { className: 'media-header' },
	              kerabat.name
	            ),
	            kerabat.email
	          )
	        )
	      );
	    });
	    return React.createElement(
	      'div',
	      { className: 'col-xs-12 col-sm-9' },
	      kerabats
	    );
	  }
	});

	// FormPinjam
	var FormPinjam = React.createClass({
	  displayName: 'FormPinjam',

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
	  render: function render() {
	    var kerabats = this.props.user.kerabat.map(function (kerabat) {
	      return React.createElement(
	        'option',
	        { value: kerabat.user_id, key: kerabat.key },
	        kerabat.name
	      );
	    });
	    return React.createElement(
	      'div',
	      { className: 'col-xs-12 col-sm-9 form-pinjam' },
	      React.createElement(
	        'div',
	        { className: 'row form-container' },
	        React.createElement(
	          'form',
	          null,
	          React.createElement(
	            'label',
	            { htmlFor: 'jumlah-saldo' },
	            'Jumlah Saldo'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-group' },
	            React.createElement('input', { type: 'text', className: 'form-control', id: 'jumlah-saldo', placeholder: 'Jumlah Saldo' })
	          ),
	          React.createElement(
	            'label',
	            { htmlFor: 'tenor' },
	            'Tenor'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-group' },
	            React.createElement('input', { type: 'number', className: 'form-control', id: 'tenor' }),
	            React.createElement(
	              'span',
	              { className: 'input-group-addon' },
	              'bulan'
	            )
	          ),
	          React.createElement(
	            'label',
	            { htmlFor: 'kerabat' },
	            'Kerabat'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-group' },
	            React.createElement(
	              'select',
	              { className: 'form-control', id: 'kerabat' },
	              kerabats
	            )
	          ),
	          React.createElement(
	            'label',
	            { htmlFor: 'alasan' },
	            'Alasan Meminjam'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-group' },
	            React.createElement('textarea', { className: 'form-control', id: 'alasan' })
	          ),
	          React.createElement(
	            'button',
	            { type: 'button', className: 'btn btn-default', id: 'cancel' },
	            'Batal'
	          ),
	          React.createElement(
	            'button',
	            { type: 'submit', className: 'btn btn-default', id: 'submit' },
	            'Pinjam'
	          )
	        )
	      )
	    );
	  }
	});

	// Requests
	var RequestList = React.createClass({
	  displayName: 'RequestList',

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
	  render: function render() {
	    var requests = this.props.user.requests.map(function (request) {
	      return React.createElement(
	        'div',
	        { className: 'row requester', key: request.key },
	        React.createElement(
	          'div',
	          { className: 'media' },
	          React.createElement(
	            'div',
	            { className: 'media-left' },
	            React.createElement('img', { className: 'media-object', src: request.picture })
	          ),
	          React.createElement(
	            'div',
	            { className: 'media-body' },
	            React.createElement(
	              'h4',
	              { className: 'media-heading' },
	              request.name
	            ),
	            request.date
	          )
	        )
	      );
	    });

	    return React.createElement(
	      'div',
	      { className: 'col-xs-12 col-sm-9 requests' },
	      requests
	    );
	  }
	});

	// Render 
	ReactDOM.render(React.createElement(App, null), document.getElementById('app-root'));

/***/ }
/******/ ]);