<?php
require 'php/log_file_viewer.php';
class LogFileViewerTest extends PHPUnit_Framework_TestCase
{
  public function test_read_file()
  {
    $file  = new LogFileViewer('logfiles/log.txt', 1, 10);
    $array = $file->readFile();
    $this->assertTrue(is_array($array));
  }
  public function test_get_formatted_data()
  {
    $file  = new LogFileViewer('logfiles/log.txt', 1, 10);
    $array = $file->getFormattedData();
    $this->assertTrue(is_array($array));
    $this->assertEquals(10, count($array['items']));
  }
  public function test_get_total_pages()
  {
    $file      = new LogFileViewer('logfiles/log.txt', 1, 10);
    $num_pages = $file->getTotalPages();
    $this->assertEquals(7, $num_pages);
  }
  public function test_get_middle_pages()
  {
    $file  = new LogFileViewer('logfiles/log.txt', 2, 10);
    $array = $file->getMiddlePages();
    $this->assertTrue(is_array($array));
    $this->assertEquals(10, count($array['items']));
  }
  public function test_get_first_page()
  {
    $file  = new LogFileViewer('logfiles/log.txt', 1, 10);
    $array = $file->getFirstPage();
    $this->assertTrue(is_array($array));
    $this->assertEquals(10, count($array['items']));
  }
  public function test_get_last_page()
  {
    $file  = new LogFileViewer('logfiles/log.txt', 7, 10);
    $array = $file->getLastPage();
    $this->assertTrue(is_array($array));
    $this->assertEquals(10, count($array['items']));
  }
  public function test_read_file_name()
  {
    $file     = new LogFileViewer('logfiles/log.txt', 1, 10);
    $filename = $file->getFileName();
    $this->assertContains('log.txt', $filename);
  }
}