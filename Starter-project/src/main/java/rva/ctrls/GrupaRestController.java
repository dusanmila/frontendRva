package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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
import rva.repository.GrupaRepository;

@Api(tags = {"Grupa CRUD operacije"})
@CrossOrigin
@RestController
public class GrupaRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private GrupaRepository grupaRepository;
	
	
	@GetMapping("grupa")
	@ApiOperation(value = "Vraća kolekciju svih grupa iz baze podataka")
	public Collection<Grupa> getGrupas() { 
		return grupaRepository.findAll();
	}
	
	@GetMapping("grupa/{id}")
	@ApiOperation(value = "Vraća jednu grupu iz baze podataka po id-u")
	public Grupa getGrupa(@PathVariable("id") Integer id) { 
		return grupaRepository.getOne(id);
	}
	
	@GetMapping("grupaOznaka/{oznaka}")
	@ApiOperation(value = "Vraća jednu grupu iz baze podataka po vrednosti oznake")
	public Collection<Grupa> getGrupaByOznaka(@PathVariable("oznaka") String oznaka)
	{
		return grupaRepository.findByOznakaContainingIgnoreCase(oznaka);
	}
	
	
	@PostMapping("grupa")
	@ApiOperation(value = "Dodaje jednu novu grupu u bazu podataka")
	public ResponseEntity<Grupa> insertGrupa(@RequestBody Grupa grupa)
	{
		if(!grupaRepository.existsById(grupa.getId()))
		{
			grupaRepository.save(grupa);
			return new ResponseEntity<Grupa>(HttpStatus.OK);
		}
		
		return new ResponseEntity<Grupa>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("grupa/{id}")
	@ApiOperation(value = "Modifikuje jednu grupu iz baze podataka po id-u")
	public ResponseEntity<Grupa> updateGrupa(@RequestBody Grupa grupa)
	{
		if(grupaRepository.existsById(grupa.getId()))
		{
			grupaRepository.save(grupa);
			return new ResponseEntity<Grupa>(HttpStatus.OK);
		}
		return new ResponseEntity<Grupa>(HttpStatus.NO_CONTENT);
	}
	 
	@Transactional
	@DeleteMapping("grupa/{id}")
	@ApiOperation(value = "Brise jednu grupu iz baze podataka po id-u")
	public ResponseEntity<Grupa> deleteGrupa(@PathVariable("id") Integer id)
	{
		if(!grupaRepository.existsById(id))
		{	
			return new ResponseEntity<Grupa>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from student where grupa= "+id);
		grupaRepository.deleteById(id);
		if(id == -100)
		{
			jdbcTemplate.execute("INSERT INTO \"grupa\"(\"id\", \"oznaka\", \"smer\")\r\n"
					+ "VALUES (-100, 'TestOzn', 1);");
		}
		return new ResponseEntity<Grupa>(HttpStatus.OK);
	}
	
	
	
}
