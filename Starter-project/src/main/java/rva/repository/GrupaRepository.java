package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Grupa;
import rva.jpa.Smer;

public interface GrupaRepository extends JpaRepository<Grupa, Integer> {
	
	Collection<Grupa> findByOznakaContainingIgnoreCase(String oznaka);
	
	Collection<Grupa> findBySmer(Smer s);
	
	
	//@Query(value="select coalesce(max()
	//Integer nextRBr(Integer smerId);
}
