'use strict';

var CategoryService = require('./services/Category'),
    ClientService = require('./services/Client'),
    EstimateService = require('./services/Estimate'),
    ExpenseService = require('./services/Expense'),
    GatewayService = require('./services/Gateway'),
    InvoiceService = require('./services/Invoice'),
    ItemService = require('./services/Item'),
    LanguageService = require('./services/Language'),
    PaymentService = require('./services/Payment'),
    ProjectService = require('./services/Project'),
    RecurringService = require('./services/Recurring'),
    StaffService = require('./services/Staff'),
    SystemService = require('./services/System'),
    TaskService = require('./services/Task'),
    TaxService = require('./services/Tax'),
    TimeEntryService = require('./services/TimeEntry');

var FreshBooks = function(url, token) {
  if ( !(this instanceof FreshBooks)) {
    return new FreshBooks(url, token);
  }

  this.config = {};

  if (typeof url === 'string') {
    this.config.url = url;
  }

  if (typeof token === 'string') {
    this.config.token = token;
  }

  if (typeof arguments[0] === 'object' && arguments[0] !== null) {
    this.config = arguments[0];
  }

  this.category = new CategoryService(this.config);
  this.client = new ClientService(this.config);
  this.estimate = new EstimateService(this.config);
  this.expense = new ExpenseService(this.config);
  this.gateway = new GatewayService(this.config);
  this.invoice = new InvoiceService(this.config);
  this.item = new ItemService(this.config);
  this.language = new LanguageService(this.config);
  this.payment = new PaymentService(this.config);
  this.project = new ProjectService(this.config);
  this.recurring = new RecurringService(this.config);
  this.staff = new StaffService(this.config);
  this.system = new SystemService(this.config);
  this.task = new TaskService(this.config);
  this.tax = new TaxService(this.config);
  this.time_entry = new TimeEntryService(this.config);
};

module.exports = FreshBooks;
