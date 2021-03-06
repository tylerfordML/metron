/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {browser, element, by} from 'protractor';
import {waitForElementPresence} from '../../utils/e2e_util';

export class AlertFacetsPage {

  private sleepTime = 500;

  navgateToAlertList() {
    browser.waitForAngularEnabled(false);
    return browser.get('/alerts-list');
  }

  getFacetsTitle() {
    return waitForElementPresence(element.all(by.css('app-alert-filters metron-collapse'))).then(() => {
      return element.all(by.css('app-alert-filters .title')).getText();
    });
  }

  getFacetsValues() {
    return element.all(by.css('app-alert-filters metron-collapse')).getText();
  }

  getFacetState(id: number) {
    browser.sleep(this.sleepTime);
    let collpaseElement = element.all(by.css('metron-collapse')).get(id);
    browser.actions().mouseMove(collpaseElement).perform();
    return collpaseElement.element(by.css('div.collapse')).getAttribute('class');
  }

  toggleFacetState(id: number) {
    browser.sleep(this.sleepTime);
    let collpaseElement = element.all(by.css('metron-collapse')).get(id);
    browser.actions().mouseMove(collpaseElement).perform();
    return collpaseElement.element(by.css('a')).click();
  }

  getFacetValues(id: number) {
    let collapsableElement = element.all(by.css('metron-collapse')).get(id);
    return collapsableElement.element(by.css('.list-group')).getText().then(text => {
      let facetMap = {};
      let facetValues = text.split('\n');
      for (let i = 0; i < facetValues.length; i = i + 2) {
        facetMap[facetValues[i]] = facetValues[i + 1];
      }
      return facetMap;
    });
  }

}

