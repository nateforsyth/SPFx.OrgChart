'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);


build.addSuppression(`Warning - [sass] The local CSS class 'ms-ListScrollingExample-container' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-ListScrollingExample-itemCell' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-ListScrollingExample-itemContent' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-ListScrollingExample-itemContent-odd' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-ListScrollingExample-itemContent-even' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-ListScrollingExample-selected' is not camelCase and will not be type-safe.`);

build.addSuppression(`Warning - tslint - src/controls/CreateListDialog/CreateListDialog.tsx(78,237): error no-unused-expression: unused expression, expected an assignment or function call`);

build.initialize(gulp);
