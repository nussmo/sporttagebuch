package ch.sporttagebuch.domain;

import java.util.List;
import java.util.Optional;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class SporttagebuchController {
	
	@Autowired
	private SporttagebuchRepository repository;
	
	@GetMapping("/tagebuch")
	public List<Sporttagebuch> getAllEntries(){
		return repository.findAll();
	}
	
	@GetMapping("/tagebuch/{id}")
	public ResponseEntity<Sporttagebuch> getEntry(@PathVariable long id){
		if(repository.existsById(id)){
			Optional<Sporttagebuch> entry = repository.findById(id);
			return new ResponseEntity<Sporttagebuch>(entry.get(), HttpStatus.OK);
		}
		return new ResponseEntity<Sporttagebuch>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/tagebuch/{id}")
	public ResponseEntity<String> deleteEntry(@PathVariable long id){
		if(repository.existsById(id)){
			repository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/tagebuch")
	public ResponseEntity<Sporttagebuch> createEntry(@RequestBody String entry) throws JSONException{
		//TODO: test preconditions
		/* if(entry.hasErrors()){return new ResponseEntity<Sporttagebuch>(HttpStatus.PRECONDITION_FAILED);*/
		JSONObject json = new JSONObject(entry);
		Sporttagebuch newEntry = new Sporttagebuch(json);	
		Sporttagebuch savedEntry = repository.save(newEntry);
		return new ResponseEntity<Sporttagebuch>(savedEntry, HttpStatus.CREATED);
	}
	
	@PutMapping("/students/{id}")
	public ResponseEntity<Sporttagebuch> updateEntry(@RequestBody Sporttagebuch entry, @PathVariable long id){
		//TODO: test preconditions
		/*if(result.hasErrors()) {
			
			return new ResponseEntity<Questionnaire>(HttpStatus.PRECONDITION_FAILED);
		}*/
		if(repository.existsById(id)){
			Optional<Sporttagebuch> optionalEntry = repository.findById(id);
			Sporttagebuch oldEntry = optionalEntry.get();
//			oldEntry.setDate(entry.getDate());
//			oldEntry.setTime(entry.getTime());
			oldEntry.setDiscipline(entry.getDiscipline());
//			oldEntry.setIntensity(entry.getIntensity());
//			oldEntry.setNotes(entry.getNotes());
			Sporttagebuch savedEntry = repository.save(oldEntry);
			return new ResponseEntity<Sporttagebuch>(savedEntry, HttpStatus.OK);
		}
		
		return new ResponseEntity<Sporttagebuch>(HttpStatus.NOT_FOUND);
	}

}
