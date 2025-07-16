<?php

$db_file = '../../db/metadata.db';


$init_dev_file = './init-dev.php';
if(file_exists($init_dev_file)) include $init_dev_file;


// var_dump($db_file);

$db = new SQLite3($db_file, SQLITE3_OPEN_READONLY);

$SqlLite_version = SQLite3::version()['versionNumber'];
$isRecentSqlLite = $SqlLite_version >= 3030000;
