'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('experiences', ['core']);
ApplicationConfiguration.registerModule('experiences.admin', ['core.admin']);
ApplicationConfiguration.registerModule('experiences.admin.routes', ['core.admin.routes']);
