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
	    this.setState(appState);
	  },
	  render: function render() {
	    var activeContent = '';
	    if (this.state.activeWindow === 0) {
	      activeContent = React.createElement(Dashboard, { user: this.state.user, update: this.updateState });
	    } else if (this.state.activeWindow === 1) {
	      activeContent = React.createElement(Kerabat, { user: this.state.user, update: this.updateState });
	    } else if (this.state.activeWindow === 2) {
	      activeContent = React.createElement(FormPinjam, { user: this.state.user, update: this.updateState });
	    } else if (this.state.activeWindow === 3) {
	      activeContent = React.createElement(RequestList, { user: this.state.user, update: this.updateState });
	    }

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(Sidebar, { update: this.updateState }),
	      activeContent
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
	    var _this = this;

	    var classes = [];
	    for (var i = 0; i < 4; i++) {
	      classes[i] = 'list-group-item';
	      if (this.state.active === i) {
	        classes[i] = classes[i] + 'list-group-item-active';
	      }
	    }
	    return React.createElement(
	      'div',
	      { id: 'sidebar', className: 'col-xs-12 col-sm-3 sidebar' },
	      React.createElement(
	        'div',
	        { className: 'list-group row', onClick: function onClick() {
	            return _this.handleChange(0);
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
	            return _this.handleChange(1);
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
	            return _this.handleChange(2);
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
	            return _this.handleChange(3);
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
	      { className: 'col-xs-12 col-sm-9' },
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
	              { className: 'panel-heading' },
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
	              { className: 'panel-heading' },
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

	  getInitialState: function getInitialState() {
	    return this.props.user.kerabat;
	  },
	  componentWillMount: function componentWillMount() {
	    $.ajax({
	      url: 'list-kerabat',
	      data: {
	        user_id: this.props.user.user_id
	      },
	      cache: false,
	      type: POST,
	      success: function success(event) {
	        appState.user.kerabat = jQuery.parseJSON(event);
	        this.props.update();
	      }
	    });
	  },
	  handleClick: function handleClick() {
	    //TODO send ajax
	  },
	  render: function render() {
	    var kerabats = this.props.user.kerabat.map(function (kerabat) {
	      var details = '';
	      if (kerabat.opened === true) {
	        // print details
	      }
	      return React.createElement(
	        'div',
	        { className: 'col-xs-12' },
	        React.createElement(
	          'div',
	          { className: 'row kerabat' },
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
	        )
	      );
	    });

	    return { kerabats: kerabats };
	  }
	});

	// FormPinjam
	var FormPinjam = React.createClass({
	  displayName: 'FormPinjam',

	  handleSubmit: function handleSubmit(event) {
	    // TODO
	  },
	  componentWillMount: function componentWillMount() {
	    $.ajax({
	      url: 'list-kerabat',
	      data: {
	        user_id: this.props.user.user_id
	      },
	      cache: false,
	      type: POST,
	      success: function success(event) {
	        appState.user.kerabat = jQuery.parseJSON(event);
	        this.props.update();
	      }
	    });
	  },
	  render: function render() {
	    var kerabats = this.props.user.kerabat.map(function (kerabat) {
	      return React.createElement(
	        'option',
	        { value: kerabat.user_id },
	        kerabat.name
	      );
	    });
	    return React.createElement(
	      'div',
	      { className: 'col-xs-12' },
	      React.createElement(
	        'div',
	        { className: 'row form-container' },
	        React.createElement(
	          'form',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'jumlah-saldo' },
	            'Jumlah Saldo'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-group' },
	            React.createElement('input', { type: 'text', className: 'form-control', id: 'jumlah-saldo', placeholder: 'Jumlah Saldo' })
	          ),
	          React.createElement(
	            'label',
	            { 'for': 'tenor' },
	            'Tenor'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-group' },
	            React.createElement('input', { type: 'number', className: 'form-control', id: 'tenor' }),
	            React.createElement(
	              'span',
	              { 'class': 'input-group-addon' },
	              'bulan'
	            )
	          ),
	          React.createElement(
	            'label',
	            { 'for': 'kerabat' },
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
	            { 'for': 'alasan' },
	            'Alasan Meminjam'
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-group' },
	            React.createElement('textarea', { className: 'form-control', id: 'alasan' })
	          ),
	          React.createElement(
	            'button',
	            { type: 'button', 'class': 'btn btn-default', id: 'cancel' },
	            'Batal'
	          ),
	          React.createElement(
	            'button',
	            { type: 'submit', 'class': 'btn btn-default', id: 'submit' },
	            'Pinjam'
	          )
	        )
	      )
	    );
	  }
	});

	// Requests
	var Requests = React.createClass({
	  displayName: 'Requests',

	  componentWillMount: function componentWillMount() {
	    $.ajax({
	      url: 'list-all-loan',
	      data: {
	        user_id: this.props.user.user_id
	      },
	      cache: false,
	      type: POST,
	      success: function success(event) {
	        appState.user.requests = jQuery.parseJSON(event);
	        this.props.update();
	      }
	    });
	  },
	  render: function render() {
	    var requests = this.props.user.requests.map(function (request) {
	      return React.createElement(
	        'div',
	        { className: 'row requester' },
	        React.createElement(
	          'div',
	          { className: 'media' },
	          React.createElement(
	            'div',
	            { className: 'media-left' },
	            React.createElement('img', { 'class': 'media-object', src: request.user.picture })
	          ),
	          React.createElement(
	            'div',
	            { 'class': 'media-body' },
	            React.createElement(
	              'h4',
	              { classname: 'media-heading' },
	              request.user.name
	            ),
	            request.date
	          )
	        )
	      );
	    });

	    return React.createElement(
	      'div',
	      { className: 'col-xs-12' },
	      requests
	    );
	  }
	});

	// Render 
	ReactDOM.render(React.createElement(App, null), document.getElementById('app-root'));

/***/ }
/******/ ]);