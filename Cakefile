{spawn, exec} = require 'child_process'

runCommand = (cmd) ->
  child = exec(cmd, (error, stdout, stderr) ->
    if error != null
      console.log "exec error: #{error}"
  )

test = (msg, name, args...) ->
  res = false
  proc = spawn name, args
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  
  proc.stdout.on 'data', (buffer) ->
    res = true if buffer.toString() != ""
  
  proc.on 'exit', (status) ->
    console.log msg unless res
    process.exit(1) if status isnt 0

# ====================================
#              TASKS
# ====================================    
task 'build', 'Generate JS from Coffeescript', (options) ->
  runCommand 'coffee -c *.coffee'
  console.log "JS Compiled to root folder"
  runCommand 'coffee -c routes/*.coffee'
  console.log "JS Compiled to routes folder"

task 'clean', 'Remove js output', (options) ->
  runCommand 'rm *.js'
  console.log "JS deleted from root folder"
  
task 'deps', 'Check dependencies', (options) ->
  test 'You need to have CoffeeScript in your PATH.\nPlease install it using `brew install coffee-script` or `npm install coffee-script`.', 'which' , 'coffee'