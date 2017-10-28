<?php
/**
 * LogFileViewer Class
 * The class is used to read log file page wise
 * @package    LogFileViewer
 * @author     Senthilkumar
 */
class LogFileViewer
{
  public $log_file = null;
  public $log_file_name = null;
  public $result = [];
  public $items = [];
  public $row_count;
  public $page;
  public $total_lines;
  /**
   * Class Constructor - Initializing file reader
   * @param string $file passing file path
   * @param integer $page  passing page number
   * @param integer $row_count passing number of rows
   */
  public function __construct($file, $page, $row_count)
  {
    $this->log_file      = new SplFileObject($file);
    $this->log_file_name = $file;
    $this->row_count     = $row_count;
    $this->page          = $page;
  }
  /**
   * Reads only particular lines based on the row_count(10,20,30,40,50) from the file.
   * line number and logs details are stored in array with separate index
   * @return array Returns array of lines
   */
  public function readFile()
  {
    if ($this->log_file) {
      $temp_array = [];
      $i = 1;
      while (!$this->log_file->eof()) {
        $this_line          = $this->log_file->fgets();
        $temp_array['No']   = $this->log_file->key() + 1;
        $temp_array['Logs'] = $this_line;
        array_push($this->items, $temp_array);
        if ($i === $this->row_count) {
          break;
        }
        $i++;
      }
      return $this->items;
    }
  }
  /**
   * Formatig data associated with an Array
   * @return array Returns array of columns and Items
   */
  public function getFormattedData()
  {
    $this->result = array(
      'columns' => array(
        array(
          'key' => 'No',
          'label' => 'S.No',
          'type' => 'Number'
        ),
        array(
          'key' => 'Logs',
          'label' => $this->getFileName(),
          'type' => 'String'
        )
      ),
      'items' => $this->readFile()
    );
    return $this->result;
  }
  /**
   * @return string Returns name of the file
   */
  public function getFileName()
  {
    if (basename($this->log_file_name)) {
      return basename($this->log_file_name);
    } else {
      return $this->log_file_name;
    }
  }
  /**
   * Get total lines from the file
   * Divide total lines with number of rows
   * @return integer Returns total number of pages
   */
  public function getTotalPages()
  {
    $this->log_file->seek($this->log_file->getSize());
    $total_lines = $this->log_file->key() + 1;
    $total_pages = ceil($total_lines / $this->row_count);
    return $total_pages;
  }
  /**
   * Get middle pages like Prev or Next 
   * @return array Returns array of columns and Items
   */
  public function getMiddlePages()
  {
    $this->log_file->seek(($this->getPageOffet()) - 1);
    return $this->getFormattedData();
  }
  /**
   * Get first page 
   * @return array Returns array of columns and Items
   */
  public function getFirstPage()
  {
    return $this->getFormattedData();
  }
  /**
   * Get Last page 
   * @return array Returns array of columns and Items
   */
  public function getLastPage()
  {
    $this->log_file->seek($this->log_file->getSize());
    $this->log_file->seek($this->log_file->key() - $this->row_count);
    return $this->getFormattedData();
  }
  /**
   * Get offset for paginate
   * @return interger Returns offet for paginate
   */
  public function getPageOffet()
  {
    return (($this->page - 1) * $this->row_count);
  }
  /**
   * Class Destructor - Closing file reader
   *
   */
  public function __destruct()
  {
    $this->log_file = null;
  }
}