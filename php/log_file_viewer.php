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
    /**
    * Class Constructor - Initializing file reader
    * Store log file name
    */
    public function __construct($file)
    { 
        $this->log_file_name = $file;
        $this->log_file = new SplFileObject($file);

       // print_r($this->log_file); exit;
    }
    /**
     * Read log file and setting index Number and Logs
     *
     * @return array Returns array of lines
     */
    public function getReadFile()
    {   
        if ($this->log_file) {
            $temp_array=[];
            $i = 1;
            while(!$this->log_file->eof()) {
              $this_line = $this->log_file->fgets();       
              $temp_array['No']=$i;
              $temp_array['Logs']=$this_line;         
              array_push($this->items, $temp_array);
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
                                        'label' => 'Lines',
                                        'type' => 'Number'
                                    ),
                                array(
                                        'key' => 'Logs',
                                        'label' => 'Logs File : '.$this->getFileName(),
                                        'type' => 'String'
                                    )
                            ),
                            'items' => $this->getReadFile()
                        );

        return $this->result;
    }

    public function getFileName() 
    {
        if(basename($this->log_file_name)) {
            return basename($this->log_file_name);
        } else {
            return $this->log_file_name;
        }
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
