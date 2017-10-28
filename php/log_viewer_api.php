<?php
/**
 * Ajax call
 * This file used to connect PHP class file
 * Sending Request and get response from PHP log-file-viewer
 * Handles pagination
 * Return JSON data with Lines and Logs details
 * @author Senthilkumar G
 */
include_once 'log_file_viewer.php';
/*
 * Get file path / name from ajax call
 * Checks files from local or external server and sending absolute path base on the location
 * Read file fron LogFileViewer class
 * @return data with associate arrays
 */
class LogViewerApi extends LogFileViewer
{
  const DEFAULT_ROWS = 10;
  const DEFAULT_PAGE = 1;
  const DEFAULT_FILE = 'logfiles/log.txt';
  public $file_path;
  public function __construct()
  {
    $row_count       = isset($_GET['row_count']) && (int) $_GET['row_count'] > 0 ? (int) $_GET['row_count'] : self::DEFAULT_ROWS;
    $page            = isset($_GET['page']) && (int) $_GET['page'] > 0 ? (int) $_GET['page'] : self::DEFAULT_PAGE;
    $this->file_path = isset($_GET['file_path']) ? $_GET['file_path'] : self::DEFAULT_FILE;
    parent::__construct($this->file_path, $page, $row_count);
  }
  /* getPageList handles to get items for particular page
   * Items for First Page, Prev page , Next page and Last page
   * @return Items with arrays
   */
  public function getPageList()
  {
    if ($this->page === 1) {
      $result = $this->getFirstPage();
    } else if ($this->page > 1) {
      $result = $this->getMiddlePages();
    } else if ($this->page === $this->getPages()) {
      $result = $this->getLastPage();
    }
    return $result;
  }
  /* getLoadPages handles to load a page
   * It handles pagination for First Page, Prev page , Next page and Last page
   * @return associate arrays with Items and Paginate
   */
  public function getLoadPages()
  {
    $result             = $this->getPageList();
    $pages              = $this->getTotalPages();
    $page               = ($this->page > $pages) ? $pages : $this->page;
    $offset             = $this->getPageOffet();
    $row_count          = $this->row_count;
    $file_path          = $this->file_path;
    $result['paginate'] = compact('page', 'pages', 'offset', 'row_count', 'total', 'file_path');
    return $result;
  }
}
/*
 * Creating instance of the class LogViewerApi and then called a method getLoadPages on that to load pages
 */
$result = new LogViewerApi();
$result = $result->getLoadPages();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($result);
?>