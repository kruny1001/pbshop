/**
 * Created by KevinSo on 7/16/2014.
 */

function value(name, val) {
    return factory(name, valueFn(val));
}

function service(name, constructor) {
    return factory(name, ['$injector', function($injector) {
        return $injector.instantiate(constructor);
    }]);
}

angular.module('Logger', []).
    config(function($provide) {
        $provide.decorator('requests', function($log, $delegate) {
            var logger = function(key) {
                var args = Array.prototype.slice.call(arguments, 1);
                $log.log('%crequests%c.%c' + key +
                        '%c invoked with arguments:',
                    'color: teal;',    // serviceName in teal
                    'color: black;',
                    'color: blue;',    // method in blue
                    'color: black;');
                $log.log('\t', args);
                return $delegate[key].apply($delegate, args);
            };

            angular.forEach($delegate, function(val, key) {
                logger[key] = (typeof val === 'function') ?
                    logger.bind($delegate, key) :
                    $delegate[key];
            });

            return logger;
        });
    })
;

angular.module('API', []).
    config(function($provide) {
        $provide.decorator('$http', function($delegate) {
            $delegate.options = function(url, config) {
                var optionsConfig = {};

                angular.extend(optionsConfig, config);
                optionsConfig.method = 'OPTIONS';
                optionsConfig.url = url;

                return $delegate(optionsConfig);
            };
        });
    })
;


function decorator(serviceName, decorFn) {
    var origProvider = providerInjector.get(serviceName + providerSuffix),
        orig$get = origProvider.$get;

    origProvider.$get = function() {
        var origInstance = instanceInjector.invoke(orig$get, origProvider);
        return instanceInjector.invoke(decorFn, null, {$delegate: origInstance});
    };
}