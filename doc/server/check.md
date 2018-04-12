# Check Service

The check service is used to test that everything works fine and the server may be used correctly.

The server has a list of checks defined which will run with timing as it is called and it's result is presented back to be easily analyzed for manual check or monitoring tools like Nagios.

Run a complete check:

    $ curl -sX GET http://localhost:3030/check | prettyjson
    -
      check:   base
      status:  true
      message: Base check that server is running
      time:    61
    -
      check:   mongodb
      status:  1
      message: Mongoose connection status: 1
      time:    59

Or you may only run a single check:

    $ curl -sX GET http://localhost:3030/check/mongodb | prettyjson
    check:   mongodb
    status:  1
    message: Mongoose connection status: 1
    time:    63

The values are:
- __check__ - the shortname of the check which may be used to run only this
- __status__ - boolean `1` if ok else `0`
- __message__ - short text explaining the current status
- __time__ - time used to run check in mycroseconds

To use it in Nagios you may check that there is no `status: 0` within the text. Or call a single check and use its `time` as performance data.
