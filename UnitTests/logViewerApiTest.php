<?php
class logViewerApiTest extends PHPUnit_Framework_TestCase
{
    protected $backupGlobalsBlacklist = ['globalVariable'];
    protected function setUp()
    {
        $this->pageLines = 10;
        $this->firstPage = 1;
        $this->nextPage = ($this->firstPage + 1);
        $this->prevPage = ($this->pageLines - 1);
        $this->lastPage = $this->pageLines;
        $this->url = 'http://localhost/PropertyGuru/LogFileViewer/php/log_viewer_api.php';
    
    }

    public function test_not_valid_request()
    {
        $content = file_get_contents($this->url);
        $this->assertContains('Request is not valid',$content);
    }
    
    public function test_read_first_page()
    {
        $content = file_get_contents($this->url.'?file_path=log.txt&page='.$this->firstPage);
        $this->assertContains('Sun Mar 7 16:02:00 2004',$content);
    }

    public function test_read_prev_page()
    {   
        $content = file_get_contents($this->url.'?file_path=log.txt&page='.$this->prevPage);
        $this->assertContains('Mon Mar 8 05:24:29 2004',$content);
    }

    public function test_read_next_page()
    {
        $content = file_get_contents($this->url.'?file_path=log.txt&page='.$this->nextPage);
        $this->assertContains('Sun Mar 7 17:31:39 2004',$content);
    }

    public function test_read_last_page()
    {
        $content = file_get_contents($this->url.'?file_path=log.txt&page='.$this->lastPage);
        $this->assertContains('Mon Mar 8 05:31:47 2004',$content);
    }
}