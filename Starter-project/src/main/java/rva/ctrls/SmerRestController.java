package rva.ctrls;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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
import rva.jpa.Smer;
import rva.jpa.Smer;
import rva.repository.GrupaRepository;
import rva.repository.SmerRepository;

@Api(tags = {"Smer CRUD operacije"})
@CrossOrigin
@RestController
public class SmerRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private SmerRepository smerRepository;
	
	@Autowired
	private GrupaRepository grupaRepository;


	@GetMapping("smer")
	@ApiOperation(value = "Vraća kolekciju svih smerova iz baze podataka")
	public Collection<Smer> getSmers() { 
		return smerRepository.findAll();
	}
	
	@GetMapping("smer/{id}")
	@ApiOperation(value = "Vraća jedan smer iz baze podataka po id-u")
	public Smer getSmer(@PathVariable("id") Integer id) { 
		return smerRepository.getOne(id);
	}
	
	@GetMapping("smerNaziv/{naziv}")
	@ApiOperation(value = "Vraća jedan smer iz baze podataka po vrednosti naziva")
	public Collection<Smer> getSmerByNaziv(@PathVariable("naziv") String naziv)
	{
		return smerRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("smer")
	@ApiOperation(value = "Dodaje jedan novi smer u bazu podataka")
	public ResponseEntity<Smer> insertSmer(@RequestBody Smer Smer)
	{
		if(!smerRepository.existsById(Smer.getId()))
		{
			smerRepository.save(Smer);
			return new ResponseEntity<Smer>(HttpStatus.OK);
		}
		
		return new ResponseEntity<Smer>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("smer/{id}")
	@ApiOperation(value = "Modifikuje jedan smer iz baze podataka po id-u")
	public ResponseEntity<Smer> updateSmer(@RequestBody Smer Smer)
	{
		if(smerRepository.existsById(Smer.getId()))
		{
			smerRepository.save(Smer);
			return new ResponseEntity<Smer>(HttpStatus.OK);
		}
		return new ResponseEntity<Smer>(HttpStatus.NO_CONTENT);
	}
	 
	@Transactional
	@DeleteMapping("smer/{id}")
	@ApiOperation(value = "Brise jedan smer iz baze podataka po id-u")
	public ResponseEntity<Smer> deleteSmer(@PathVariable("id") Integer id)
	{
		if(!smerRepository.existsById(id))
		{	
			return new ResponseEntity<Smer>(HttpStatus.NO_CONTENT);
		}
		Collection<Grupa> g=grupaRepository.findBySmer(smerRepository.getOne(id));
		for(Grupa var:g)
		{
			jdbcTemplate.execute("delete from student where grupa= "+var.getId());
		}
		jdbcTemplate.execute("delete from grupa where smer= "+id);
		
		
		smerRepository.deleteById(id);
		if(id == -100)
		{
			jdbcTemplate.execute("INSERT INTO \"smer\"(\"id\", \"naziv\", \"oznaka\")\r\n"
					+ "VALUES (-100, 'TestNaz', 'TestOzn');");
		}
		return new ResponseEntity<Smer>(HttpStatus.OK);
	}
	
	
}
