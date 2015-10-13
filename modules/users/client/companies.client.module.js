'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('companies', ['core']);
ApplicationConfiguration.registerModule('companies.admin', ['core.admin']);
ApplicationConfiguration.registerModule('companies.admin.routes', ['core.admin.routes']);
