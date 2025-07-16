<?php

require_once 'init.php';

$end = isset($_GET['limit'])? $_GET['limit'] : 20;
$start = isset($_GET['pag'])? $_GET['pag'] * $end : 0;
$orderByKey = isset($_GET['orderBy'])? $_GET['orderBy'] : null;

$where = [];
$join = [];

if(!empty($_GET['authorId'])) {
  $join[] = "INNER JOIN books_authors_link as bal ON ( bal.book = books.id AND bal.author = :a )";
  $orderByKey = $orderByKey? $orderByKey : 'year';

} else if(!empty($_GET['serieId'])) {
  $where[] = "(serie_id = :s)";
  $orderByKey = $orderByKey? $orderByKey : 'serie';

} else if(!empty($_GET['scaffaleId'])) {
  $where[] = "(scaffale_id = :sc)";
  $orderByKey = $orderByKey? $orderByKey : 'serie';

} else if(!empty($_GET['tagId'])) {
  $join[] = "INNER JOIN books_tags_link as tal ON ( tal.book = books.id AND tal.tag = :t )";

} else if(!empty($_GET['q'])) {
  $where[] = "(authors_sort LIKE :q OR books.title LIKE :q  OR serie LIKE :q)";
}

$orderBy = [];

// ordinamento serie
if($isRecentSqlLite ) {
  $ordinamento_serie = "serie ASC NULLS LAST, books.series_index ASC, authors_sort ASC";
} else {
  $ordinamento_serie = "IFNULL(serie, 'zzzz') ASC, books.series_index ASC, authors_sort ASC";
}

switch ($orderByKey) {
  case 'serie':
    $orderBy[] = $ordinamento_serie;
    break;

  case 'author':
    $orderBy[] = "authors_sort ASC";
    break;

  case 'title':
    $orderBy[] = "books.sort ASC";
    break;

  // TODO controllare ordinamento per anno in modo che consideri la serie
  case 'year':
    if($isRecentSqlLite ) {
      // $orderBy[] = "prima_ediz ASC NULLS LAST, pub_year ASC NULLS LAST";
      $orderBy[] = "IFNULL(prima_ediz, pub_year) ASC NULLS LAST";
    } else {
      // $orderBy[] = "IFNULL(prima_ediz, 'zzzz') ASC, IFNULL(pub_year, 'zzzz') ASC";
      $orderBy[] = "IFNULL(IFNULL(prima_ediz, pub_year), 'zzzz') ASC";
    }
    // edizioni nello stesso anno vengono ordinate per serie
    $orderBy[] = $ordinamento_serie;
    break;

  default: // recenti
    $orderBy[] = "books.timestamp DESC"; // "books.id DESC";
    break;
}

$is_authors_sort = count(preg_grep('/authors_sort/', [...$where, ...$orderBy])) > 0;


$q = "select distinct
  books.id, books.title, strftime('%Y', books.pubdate) as pub_year, books.timestamp,
  books.has_cover,
  series.id as serie_id, series.name as serie, books.series_index,
  publishers.name as publisher,

  GROUP_CONCAT(data.format, ', ') as files_format,

  ". ($is_authors_sort ?
    "(select group_concat(authors.sort, ', ')
      FROM authors
      JOIN books_authors_link as ba ON (ba.book = books.id AND ba.author = authors.id)
      ORDER BY ba.id
    ) as authors_sort,"
  : '') . "

  /* (select group_concat(tags.name, ', ')
    FROM tags
    JOIN books_tags_link as bt ON (bt.book = books.id and bt.tag = tags.id)
    ORDER BY tags.name
  ) as tags, */

  (SELECT json_group_array(json_object('id', tags.id, 'name', tags.name))
    FROM (tags, books_tags_link as ta)
    WHERE ta.book = books.id AND ta.tag = tags.id) as tags,

  (SELECT json_group_array(json_object('id', authors.id, 'name', authors.name))
    FROM (authors, books_authors_link as ba)
    WHERE ba.book = books.id AND ba.author = authors.id) as authors,

  comments.text as comment,
  (ratings.rating / 2) as rating,
  ifnull(custom_column_19.value, 0) as amz, /* amazon */
  custom_column_23.id as scaffale_id, custom_column_23.value as scaffale, /* scaffale */
  custom_column_13.value as data_lettura, /* data lettura */
  custom_column_25.value as prima_ediz, /* anno prima edizione */
  ifnull(custom_column_30.value, 0) as letto /* letto (bool) */

  FROM (books)
  LEFT JOIN books_series_link as bs ON (bs.book = books.id)
  LEFT JOIN series ON (bs.series = series.id)
  LEFT JOIN books_publishers_link as bp ON (bp.book = books.id)
  LEFT JOIN publishers ON (bp.publisher = publishers.id)
  LEFT JOIN comments ON (comments.book = books.id)
  LEFT JOIN books_ratings_link as br ON (br.book = books.id)
  LEFT JOIN ratings ON (br.rating = ratings.id)
  LEFT JOIN custom_column_19 ON (custom_column_19.book = books.id)
  LEFT JOIN books_custom_column_23_link bl ON (bl.book = books.id)
  LEFT JOIN custom_column_23 ON (bl.value = custom_column_23.id)
  LEFT JOIN custom_column_13 ON (custom_column_13.book = books.id)
  LEFT JOIN custom_column_25 ON (custom_column_25.book = books.id)
  LEFT JOIN custom_column_30 ON (custom_column_30.book = books.id)
  LEFT JOIN data ON (books.id = data.book)

  " . (count($join)?  ' ' . join(' ', $join) . ' ' : '') . "

  " . (count($where)? " WHERE " . join(' AND ', $where) . " " : '') . "

  COLLATE NOACCENTS
  GROUP BY books.id
  ORDER BY " . join(', ', $orderBy) . " LIMIT {$start}, {$end}
";

// var_dump($q); exit;

$statement = $db->prepare($q);

if(!empty($_GET['q'])) {
  // $str = iconv('UTF-8', 'ASCII//TRANSLIT', $_GET['q']);
  $statement->bindValue(':q', "%{$_GET['q']}%", SQLITE3_TEXT);
}
if(!empty($_GET['serieId'])) {
  $statement->bindValue(':s', $_GET['serieId'], SQLITE3_INTEGER);
}
if(!empty($_GET['scaffaleId'])) {
  $statement->bindValue(':sc', $_GET['scaffaleId'], SQLITE3_INTEGER);
}
if(!empty($_GET['authorId'])) {
  $statement->bindValue(':a', $_GET['authorId'], SQLITE3_INTEGER);
}
if(!empty($_GET['tagId'])) {
  $statement->bindValue(':t', $_GET['tagId'], SQLITE3_INTEGER);
}

// var_dump($statement->getSQL(true)); exit;

$result = $statement->execute();

$list = [];


while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
  $list[] = $row;
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($list); //  JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK
