<?php
require 'php/log_viewer_api.php';
class logViewerApiTest extends PHPUnit_Framework_TestCase
{
  public function test_construct()
  {
    $api = new LogViewerApi();
    $this->assertEquals(1, $api->page);
    $this->assertEquals(10, $api->row_count);
    $this->assertContains('logfiles/log.txt', $api->file_path);
  }
  public function test_get_page_list()
  {
    $api   = new LogViewerApi();
    $array = $api->getPageList();
    $this->assertTrue(is_array($array));
    $this->assertEquals(10, count($array['items']));
  }
  public function test_get_load_pages()
  {
    $api        = new LogViewerApi();
    $pagination = $api->getLoadPages();
    $this->assertTrue(is_array($pagination));
    $this->assertEquals(1, $pagination['paginate']['page']);
    $this->assertEquals(7, $pagination['paginate']['pages']);
    $this->assertEquals(10, $pagination['paginate']['row_count']);
    $this->assertContains('logfiles/log.txt', $pagination['paginate']['file_path']);
  }
}