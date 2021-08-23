package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Grupa;
import rva.jpa.Student;
import rva.repository.GrupaRepository;
import rva.repository.StudentRepository;

@Api(tags = {"Student CRUD operacije"})
@CrossOrigin
@RestController
public class StudentRestController {

	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private GrupaRepository grupaRepository;
	
	@GetMapping("student")
	@ApiOperation(value = "Vraća kolekciju svih studenata iz baze podataka")
	public Collection<Student> getStudents() { 
		return studentRepository.findAll();
	}
	
	@GetMapping("student/{id}")
	@ApiOperation(value = "Vraća jednog studenta iz baze podataka po id-u")
	public Student getStudent(@PathVariable("id") Integer id) { 
		return studentRepository.getOne(id);
	}
	
	@GetMapping("studentIme/{ime}")
	@ApiOperation(value = "Vraća jednog studenta iz baze podataka po vrednosti imena")
	public Collection<Student> getStudentByNaziv(@PathVariable("id") String ime)
	{
		return studentRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@GetMapping("studentGrupa/{grupa}")
	@ApiOperation(value = "Vraća jednog studenta iz baze podataka po id-u grupe")
	public Collection<Student> getStudentByGrupa(@PathVariable("grupa") Integer id)
	{
		Grupa g = grupaRepository.getOne(id);
		return studentRepository.findByGrupa(g);
	}
	
	@PostMapping("student")
	@ApiOperation(value = "Dodaje jednog novog studenta u bazu podataka")
	public ResponseEntity<Student> insertStudent(@RequestBody Student Student)
	{
		if(!studentRepository.existsById(Student.getId()))
		{
			studentRepository.save(Student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		
		return new ResponseEntity<Student>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("student/{id}")
	@ApiOperation(value = "Modifikuje jednog studenta iz baze podataka po id-u")
	public ResponseEntity<Student> updateStudent(@RequestBody Student Student)
	{
		if(studentRepository.existsById(Student.getId()))
		{
			studentRepository.save(Student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
	}
	 
	@DeleteMapping("student/{id}")
	@ApiOperation(value = "Brise jednog studenta iz baze podataka po id-u")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id") Integer id)
	{
		if(!studentRepository.existsById(id))
		{	
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		}
		studentRepository.deleteById(id);
		if(id == -100)
		{
			jdbcTemplate.execute("INSERT INTO \"student\"(\"id\", \"ime\", \"prezime\",\"broj_indeksa\",\"grupa\",\"projekat\")\r\n"
					+ "VALUES (-100, 'TestIme','TestPrez','TestIndeks',1,2);");
		}
		return new ResponseEntity<Student>(HttpStatus.OK);
	}
	
}
