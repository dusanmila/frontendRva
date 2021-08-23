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
import rva.jpa.Projekat;
import rva.jpa.Projekat;
import rva.repository.ProjekatRepository;

@Api(tags = {"Projekat CRUD operacije"})
@CrossOrigin
@RestController
public class ProjekatRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ProjekatRepository projekatRepository;
	
	@GetMapping("projekat")
	@ApiOperation(value = "Vraća kolekciju svih projekata iz baze podataka")
	public Collection<Projekat> getProjekats() { 
		return projekatRepository.findAll();
	}
	
	@GetMapping("projekat/{id}")
	@ApiOperation(value = "Vraća jedan projekat iz baze podataka po id-u")
	public Projekat getProjekat(@PathVariable("id") Integer id) { 
		return projekatRepository.getOne(id);
	}
	
	@GetMapping("projekatNaziv/{naziv}")
	@ApiOperation(value = "Vraća jedan projekat iz baze podataka po vrednosti naziva")
	public Collection<Projekat> getProjekatByNaziv(@PathVariable("naziv") String naziv)
	{
		return projekatRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("projekat")
	@ApiOperation(value = "Dodaje jedan novi projekat u bazu podataka")
	public ResponseEntity<Projekat> insertProjekat(@RequestBody Projekat projekat)
	{
		if(!projekatRepository.existsById(projekat.getId()))
		{
			projekatRepository.save(projekat);
			return new ResponseEntity<Projekat>(HttpStatus.OK);
		}
		
		return new ResponseEntity<Projekat>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("projekat/{id}")
	@ApiOperation(value = "Modifikuje jedan projekat iz baze podataka po id-u")
	public ResponseEntity<Projekat> updateProjekat(@RequestBody Projekat projekat)
	{
		if(projekatRepository.existsById(projekat.getId()))
		{
			projekatRepository.save(projekat);
			return new ResponseEntity<Projekat>(HttpStatus.OK);
		}
		return new ResponseEntity<Projekat>(HttpStatus.NO_CONTENT);
	}
	
	@Transactional
	@DeleteMapping("projekat/{id}")
	@ApiOperation(value = "Brise jedan projekat iz baze podataka po id-u")
	public ResponseEntity<Projekat> deleteProjekat(@PathVariable("id") Integer id)
	{
		if(!projekatRepository.existsById(id))
		{	
			return new ResponseEntity<Projekat>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from student where projekat= "+id);
		projekatRepository.deleteById(id);
		if(id == -100)
		{
			jdbcTemplate.execute("INSERT INTO \"projekat\"(\"id\",\"naziv\",\"oznaka\",\"opis\")\r\n"
					+ "VALUES (-100,'TestNaz','TestOzn','TestOpis');");
		}
		return new ResponseEntity<Projekat>(HttpStatus.OK);
	}
	
}
