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
	  user: {}
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
	    this.props.update();
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
	        { className: 'col-xs-12' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'media' },
	            React.createElement(
	              'div',
	              { className: 'media-left' },
	              React.createElement('img', { className: 'media-object', src: debtor.picture }),
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
	        { className: 'col-xs-12' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'media' },
	            React.createElement(
	              'div',
	              { className: 'media-left' },
	              React.createElement('img', { className: 'media-object', src: creditor.picture }),
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

	// // Kerabat
	// var Kerabat = React.createClass({

	// })

	// Render 
	ReactDOM.render(React.createElement(App, null), document.getElementById('app-root'));

/***/ }
/******/ ]);