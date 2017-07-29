// Copyright 2012-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import Discovery from './discovery';

const discovery = new Discovery({ debug: false, includePrivate: false });

/**
 * Load the apis from apis index file
 * This file holds all version information
 * @private
 */
const apis = {};

/**
 * Return a Function that requires an API from the disk
 * @param  {String} filename Filename of API
 * @return {function}        function used to require the API from disk
 * @private
 */
function requireAPI (filename) {
  return function (options) {
    const type = typeof options;
    let version;
    if (type === 'string') {
      version = options;
      options = {};
    } else if (type === 'object') {
      version = options.version;
      delete options.version;
    } else {
      throw new Error('Argument error: Accepts only string or object');
    }
    try {
      const endpointPath = path.join(__dirname, filename, path.basename(version));
      const Endpoint = require(endpointPath);
      const ep = new Endpoint(options);
      ep.google = this; // for drive.google.transporter
      return Object.freeze(ep); // create new & freeze
    } catch (e) {
      throw new Error(util.format('Unable to load endpoint %s("%s"): %s',
        filename, version, e.message));
    }
  };
}

apis['acceleratedmobilepageurl'] = requireAPI('../apis/acceleratedmobilepageurl');
apis['adexchangebuyer'] = requireAPI('../apis/adexchangebuyer');
apis['adexchangebuyer2'] = requireAPI('../apis/adexchangebuyer2');
apis['adexchangeseller'] = requireAPI('../apis/adexchangeseller');
apis['adexperiencereport'] = requireAPI('../apis/adexperiencereport');
apis['admin'] = requireAPI('../apis/admin');
apis['adsense'] = requireAPI('../apis/adsense');
apis['adsensehost'] = requireAPI('../apis/adsensehost');
apis['analytics'] = requireAPI('../apis/analytics');
apis['analyticsreporting'] = requireAPI('../apis/analyticsreporting');
apis['androidenterprise'] = requireAPI('../apis/androidenterprise');
apis['androidpublisher'] = requireAPI('../apis/androidpublisher');
apis['appengine'] = requireAPI('../apis/appengine');
apis['appsactivity'] = requireAPI('../apis/appsactivity');
apis['appstate'] = requireAPI('../apis/appstate');
apis['bigquery'] = requireAPI('../apis/bigquery');
apis['bigquerydatatransfer'] = requireAPI('../apis/bigquerydatatransfer');
apis['blogger'] = requireAPI('../apis/blogger');
apis['books'] = requireAPI('../apis/books');
apis['calendar'] = requireAPI('../apis/calendar');
apis['civicinfo'] = requireAPI('../apis/civicinfo');
apis['classroom'] = requireAPI('../apis/classroom');
apis['cloudbilling'] = requireAPI('../apis/cloudbilling');
apis['cloudbuild'] = requireAPI('../apis/cloudbuild');
apis['clouddebugger'] = requireAPI('../apis/clouddebugger');
apis['clouderrorreporting'] = requireAPI('../apis/clouderrorreporting');
apis['cloudfunctions'] = requireAPI('../apis/cloudfunctions');
apis['cloudkms'] = requireAPI('../apis/cloudkms');
apis['cloudmonitoring'] = requireAPI('../apis/cloudmonitoring');
apis['cloudresourcemanager'] = requireAPI('../apis/cloudresourcemanager');
apis['cloudtrace'] = requireAPI('../apis/cloudtrace');
apis['clouduseraccounts'] = requireAPI('../apis/clouduseraccounts');
apis['compute'] = requireAPI('../apis/compute');
apis['consumersurveys'] = requireAPI('../apis/consumersurveys');
apis['container'] = requireAPI('../apis/container');
apis['content'] = requireAPI('../apis/content');
apis['customsearch'] = requireAPI('../apis/customsearch');
apis['dataflow'] = requireAPI('../apis/dataflow');
apis['dataproc'] = requireAPI('../apis/dataproc');
apis['datastore'] = requireAPI('../apis/datastore');
apis['deploymentmanager'] = requireAPI('../apis/deploymentmanager');
apis['dfareporting'] = requireAPI('../apis/dfareporting');
apis['discovery'] = requireAPI('../apis/discovery');
apis['dlp'] = requireAPI('../apis/dlp');
apis['dns'] = requireAPI('../apis/dns');
apis['doubleclickbidmanager'] = requireAPI('../apis/doubleclickbidmanager');
apis['doubleclicksearch'] = requireAPI('../apis/doubleclicksearch');
apis['drive'] = requireAPI('../apis/drive');
apis['firebasedynamiclinks'] = requireAPI('../apis/firebasedynamiclinks');
apis['firebaserules'] = requireAPI('../apis/firebaserules');
apis['fitness'] = requireAPI('../apis/fitness');
apis['fusiontables'] = requireAPI('../apis/fusiontables');
apis['games'] = requireAPI('../apis/games');
apis['gamesConfiguration'] = requireAPI('../apis/gamesConfiguration');
apis['gamesManagement'] = requireAPI('../apis/gamesManagement');
apis['genomics'] = requireAPI('../apis/genomics');
apis['gmail'] = requireAPI('../apis/gmail');
apis['groupsmigration'] = requireAPI('../apis/groupsmigration');
apis['groupssettings'] = requireAPI('../apis/groupssettings');
apis['iam'] = requireAPI('../apis/iam');
apis['identitytoolkit'] = requireAPI('../apis/identitytoolkit');
apis['kgsearch'] = requireAPI('../apis/kgsearch');
apis['language'] = requireAPI('../apis/language');
apis['licensing'] = requireAPI('../apis/licensing');
apis['logging'] = requireAPI('../apis/logging');
apis['manufacturers'] = requireAPI('../apis/manufacturers');
apis['mirror'] = requireAPI('../apis/mirror');
apis['ml'] = requireAPI('../apis/ml');
apis['monitoring'] = requireAPI('../apis/monitoring');
apis['oauth2'] = requireAPI('../apis/oauth2');
apis['oslogin'] = requireAPI('../apis/oslogin');
apis['pagespeedonline'] = requireAPI('../apis/pagespeedonline');
apis['partners'] = requireAPI('../apis/partners');
apis['people'] = requireAPI('../apis/people');
apis['playmoviespartner'] = requireAPI('../apis/playmoviespartner');
apis['plus'] = requireAPI('../apis/plus');
apis['plusDomains'] = requireAPI('../apis/plusDomains');
apis['prediction'] = requireAPI('../apis/prediction');
apis['proximitybeacon'] = requireAPI('../apis/proximitybeacon');
apis['pubsub'] = requireAPI('../apis/pubsub');
apis['qpxExpress'] = requireAPI('../apis/qpxExpress');
apis['replicapool'] = requireAPI('../apis/replicapool');
apis['replicapoolupdater'] = requireAPI('../apis/replicapoolupdater');
apis['reseller'] = requireAPI('../apis/reseller');
apis['resourceviews'] = requireAPI('../apis/resourceviews');
apis['runtimeconfig'] = requireAPI('../apis/runtimeconfig');
apis['safebrowsing'] = requireAPI('../apis/safebrowsing');
apis['script'] = requireAPI('../apis/script');
apis['searchconsole'] = requireAPI('../apis/searchconsole');
apis['servicecontrol'] = requireAPI('../apis/servicecontrol');
apis['servicemanagement'] = requireAPI('../apis/servicemanagement');
apis['serviceuser'] = requireAPI('../apis/serviceuser');
apis['sheets'] = requireAPI('../apis/sheets');
apis['siteVerification'] = requireAPI('../apis/siteVerification');
apis['slides'] = requireAPI('../apis/slides');
apis['sourcerepo'] = requireAPI('../apis/sourcerepo');
apis['spanner'] = requireAPI('../apis/spanner');
apis['spectrum'] = requireAPI('../apis/spectrum');
apis['speech'] = requireAPI('../apis/speech');
apis['sqladmin'] = requireAPI('../apis/sqladmin');
apis['storage'] = requireAPI('../apis/storage');
apis['storagetransfer'] = requireAPI('../apis/storagetransfer');
apis['streetviewpublish'] = requireAPI('../apis/streetviewpublish');
apis['surveys'] = requireAPI('../apis/surveys');
apis['tagmanager'] = requireAPI('../apis/tagmanager');
apis['taskqueue'] = requireAPI('../apis/taskqueue');
apis['tasks'] = requireAPI('../apis/tasks');
apis['toolresults'] = requireAPI('../apis/toolresults');
apis['translate'] = requireAPI('../apis/translate');
apis['urlshortener'] = requireAPI('../apis/urlshortener');
apis['videointelligence'] = requireAPI('../apis/videointelligence');
apis['vision'] = requireAPI('../apis/vision');
apis['webfonts'] = requireAPI('../apis/webfonts');
apis['webmasters'] = requireAPI('../apis/webmasters');
apis['youtube'] = requireAPI('../apis/youtube');
apis['youtubeAnalytics'] = requireAPI('../apis/youtubeAnalytics');
apis['youtubereporting'] = requireAPI('../apis/youtubereporting');

/**
 * @class GoogleAuth
 */
const GoogleAuth = require('google-auth-library');

/**
 * GoogleApis constructor.
 *
 * @example
 * const GoogleApis = require('googleapis').GoogleApis;
 * const google = new GoogleApis();
 *
 * @class GoogleApis
 * @param {Object} [options] Configuration options.
 */
function GoogleApis (options?) {
  this.options(options);
  this.addAPIs(apis);

  /**
   * A reference to an instance of GoogleAuth.
   *
   * @name GoogleApis#auth
   * @type {GoogleAuth}
   */
  this.auth = new GoogleAuth();

  /**
   * A reference to the {@link GoogleApis} constructor function.
   *
   * @name GoogleApis#GoogleApis
   * @see GoogleApis
   * @type {Function}
   */
  this.GoogleApis = GoogleApis;
}

/**
 * Set options.
 *
 * @param  {Object} [options] Configuration options.
 */
GoogleApis.prototype.options = function (options) {
  this._options = options || {};
};

/**
 * Add APIs endpoints to googleapis object
 * E.g. googleapis.drive and googleapis.datastore
 *
 * @name GoogleApis#addAPIs
 * @method
 * @param {Object} apis Apis to be added to this GoogleApis instance.
 * @private
 */
GoogleApis.prototype.addAPIs = function (apis) {
  for (const apiName in apis) {
    this[apiName] = apis[apiName].bind(this);
  }
};

/**
 * Dynamically generate an apis object that can provide Endpoint objects for the
 * discovered APIs.
 *
 * @example
 * const google = require('googleapis');
 * const discoveryUrl = 'https://myapp.appspot.com/_ah/api/discovery/v1/apis/';
 * google.discover(discoveryUrl, function (err) {
 *   const someapi = google.someapi('v1');
 * });
 *
 * @name GoogleApis#discover
 * @method
 * @param {string} url Url to the discovery service for a set of APIs. e.g.,
 * https://www.googleapis.com/discovery/v1/apis
 * @param {Function} callback Callback function.
 */
GoogleApis.prototype.discover = function (url, callback) {
  const self = this;

  discovery.discoverAllAPIs(url, function (err, apis) {
    if (err) {
      return callback(err);
    }
    self.addAPIs(apis);
    callback();
  });
};

/**
 * Dynamically generate an Endpoint object from a discovery doc.
 *
 * @example
 * const google = require('google');
 * const discoveryDocUrl = 'https://myapp.appspot.com/_ah/api/discovery/v1/apis/someapi/v1/rest';
 * google.discoverApi(discoveryDocUrl, function (err, someapi) {
 *   // use someapi
 * });
 *
 * @name GoogleApis#discoverAPI
 * @method
 * @param {string} path Url or file path to discover doc for a single API.
 * @param {object} [options] Options to configure the Endpoint object generated
 * from the discovery doc.
 * @param {Function} callback Callback function.
 */
GoogleApis.prototype.discoverAPI = function (path, options, callback) {
  const self = this;
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  if (!options) {
    options = {};
  }
  discovery.discoverAPI(path, function (err, Endpoint) {
    if (err) {
      return callback(err);
    }
    const ep = new Endpoint(options);
    ep.google = self; // for drive.google.transporter
    return callback(null, Object.freeze(ep)); // create new & freeze
  });
};

/**
 * {@link GoogleApis} class.
 *
 * @name module:googleapis.GoogleApis
 * @see GoogleApis
 * @type {Function}
 */

/**
 * {@link GoogleAuth} class.
 *
 * @name module:googleapis.auth
 * @see GoogleAuth
 * @type {Function}
 */

/**
 * @example
 * const google = require('googleapis');
 *
 * @module googleapis
 * @type {GoogleApis}
 */
export = new GoogleApis();
