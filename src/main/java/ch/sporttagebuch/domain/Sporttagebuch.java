package ch.sporttagebuch.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.json.JSONException;
import org.json.JSONObject;

@Entity
public class Sporttagebuch {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Temporal(TemporalType.DATE)
	private Date date;
	private String discipline;
	private String intensity;
	private String duration;
	private String notes;
	
	public Sporttagebuch(){}
	
	public Sporttagebuch(JSONObject json) {
		try {
			try {
				String tempDate = json.getString("date").substring(0, 10);
				this.date = new SimpleDateFormat("yyyy-MM-dd").parse(tempDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			this.discipline = json.getString("discipline");
			this.intensity = json.getString("intensity");
			this.duration = json.getString("duration");
			this.notes = json.getString("notes");
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}


	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Long getId() {
		return id;
	}
	
	public String getDiscipline() {
		return discipline;
	}

	public void setDiscipline(String discipline) {
		this.discipline = discipline;
	}

	public String getIntensity() {
		return intensity;
	}

	public void setIntensity(String intensity) {
		this.intensity = intensity;
	}
	
	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	
}
