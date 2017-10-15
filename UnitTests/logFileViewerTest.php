<?php
require 'php/log_file_viewer.php';

class LogFileViewerTest extends PHPUnit_Framework_TestCase
{
   public function test_read_file_Success()
    {
        $file = new LogFileViewer('logfiles/log.txt');
        $array = $file->getReadFile();
        $this->assertTrue(is_array($array));
    }

    public function test_read_file_name()
    {
        $file = new LogFileViewer('logfiles/log.txt');
        $filename = $file->getFileName();
        $this->assertContains('log.txt',$filename);
    }
    
    public function test_read_file_formatted_data()
    {  
        $file = new LogFileViewer('logfiles/log.txt');
        $array = $file->getFormattedData(); 
        $this->assertTrue(is_array($array));
        $this->assertEquals(67, count($array['items']));
    }
}