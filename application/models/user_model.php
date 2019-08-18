 <?php  
2:  defined('BASEPATH') OR exit('No direct script access allowed');  
3:  class User_model extends CI_Model  
4:  {  
5:   public function insertuser($data)  
6:   {  
7:    return $this->db->insert('user', $data);  
8:   }  
9:   public function verifyemail($key)  
10:   {  
11:    $data = array('status' => 1);  
12:      $this->db->where('md5(email)', $key);  
13:      return $this->db->update('user', $data);  
14:   }  
15:  }  